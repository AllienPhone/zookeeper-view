/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.I0Itec.zkclient.ZkClient;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.ZooKeeper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import com.sohu.zookeeper.view.untils.PingUntils;
import com.sohu.zookeeper.view.untils.ZkUtils;
import com.sohu.zookeeper.view.untils.ZkUtils.StringSerializer;
import com.sohu.zookeeper.view.untils.menu.Attributes;
import com.sohu.zookeeper.view.untils.menu.ChildMenu;
import com.sohu.zookeeper.view.untils.menu.JsonParser;
import com.sohu.zookeeper.view.untils.menu.MenuJson;
import com.sohu.zookeeper.view.untils.menu.ParentMenu;
import com.sohu.zookeeper.view.untils.menu.TreeMenu;

/**
 * @author jeffreywu
 * 
 */
@Controller
public class ZkController {

	@RequestMapping(value = "index.html", method = RequestMethod.GET)
	public String Index(HttpServletRequest request, HttpServletResponse response) {
		return "index";
	}

	@RequestMapping(value = "subserver.html", method = RequestMethod.GET)
	public ModelAndView subServer(HttpServletRequest request, HttpServletResponse response, ModelAndView model) {
		String path = request.getParameter("name");
		Preconditions.checkNotNull(path);
		model.addObject("path", String.format("/%s", path));
		model.setViewName("subserver");
		return model;
	}

	@ResponseBody
	@RequestMapping(value = "server.html", method = RequestMethod.POST)
	public String ServerPost(HttpServletRequest request, HttpServletResponse response) {
		String server = request.getParameter("server");
		String port = request.getParameter("port");
		Preconditions.checkNotNull(server);
		Preconditions.checkNotNull(port);
		String result = PingUntils.Ping(server);
		if (result == null)
			return "failure";
		request.getSession().setAttribute("server", server);
		request.getSession().setAttribute("port", port);
		return "ok";
	}

	@ResponseBody
	@RequestMapping(value = "tree_data.json", method = RequestMethod.GET)
	public String TreeData(HttpServletRequest request, HttpServletResponse response) {
		String path = request.getParameter("name");
		Preconditions.checkNotNull(path);
		List<TreeMenu> menus = Lists.newArrayList();
		ZkClient zkClient = this.getZkClient(request);
		List<TreeMenu> treeMenus = this.getTreeMenuForPath(path, zkClient, menus);
		this.closeZkClient(zkClient);
		String result = JsonParser.simpleJson(treeMenus);
		return result;
	}

	@ResponseBody
	@RequestMapping(value = "dir_data.json", method = RequestMethod.GET)
	public String DirectoryData(HttpServletRequest request, HttpServletResponse response) {
		String path = request.getParameter("name");
		Preconditions.checkNotNull(path);
		ZkClient zkClient = this.getZkClient(request);
		Boolean isExits = ZkUtils.pathExists(zkClient, path);
		this.closeZkClient(zkClient);
		if (isExits) {
			return this.getData(request, response, path);
		}
		return "";
	}

	@RequestMapping(value = "server.html", method = RequestMethod.GET)
	public ModelAndView ServerGet(HttpServletRequest request, HttpServletResponse response, ModelAndView model) {
		try {
			ParentMenu parentMenu = new ParentMenu();
			ZkClient zkClient = this.getZkClient(request);
			List<String> childs = ZkUtils.getChildren(zkClient, "/");
			this.closeZkClient(zkClient);
			parentMenu.setMenus(this.Convert(childs));
			parentMenu.setMenuname(this.getServerPath(request));
			parentMenu.setMenuid("1");
			List<ParentMenu> parentMenus = ImmutableList.of(parentMenu);
			MenuJson menuJson = new MenuJson(parentMenus);
			model.addObject("menu", menuJson.buildJson());
			model.setViewName("server");
		} catch (Exception e) {
			model.setViewName("index");
		}
		return model;
	}

	/**
	 * 获取数据
	 * 
	 * @param request
	 * @param path
	 * @return
	 */
	private String getData(HttpServletRequest request, HttpServletResponse response, String path) {
		try {

			ZooKeeper zooKeeper = (ZooKeeper) request.getSession().getAttribute("zookeeper");
			if (zooKeeper == null||!zooKeeper.getState().isConnected()||!zooKeeper.getState().isAlive()) {
				zooKeeper = new ZooKeeper(this.getServerPath(request), 5000, null);
				request.getSession().setAttribute("zookeeper", zooKeeper);
			}
			byte[] bytes = zooKeeper.getData(path, false, null);
			StringSerializer serializer = new StringSerializer();
			return serializer.deserialize(bytes).toString();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (KeeperException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return "";
	}

	private List<TreeMenu> getTreeMenuForPath(String path, ZkClient zkClient, List<TreeMenu> treeMenus) {
		Preconditions.checkNotNull(path);
		Preconditions.checkNotNull(zkClient);
		Preconditions.checkNotNull(treeMenus);
		List<String> child = ZkUtils.getChildren(zkClient, path);
		if (child != null && child.size() > 0) {
			int i = 0;
			for (String sinPath : child) {
				i++;
				TreeMenu treeMenu = new TreeMenu();
				treeMenu.setId(i);
				treeMenu.setText(sinPath);
				String childPath = String.format("%s/%s", path, sinPath);
				treeMenu.setAttributes(new Attributes(childPath));
				List<TreeMenu> treeMenus2 = this.getTreeMenuForPath(childPath, zkClient, new ArrayList<TreeMenu>());
				if (treeMenus2 != null && treeMenus2.size() > 0) {
					treeMenu.setIconCls("icon-save");
				} else {
					treeMenu.setIconCls("Books");
				}
				treeMenu.setChildren(treeMenus2);
				treeMenus.add(treeMenu);
			}
		}
		return treeMenus;
	}

	private List<ChildMenu> Convert(List<String> childs) {
		List<ChildMenu> childMenus = Lists.newArrayList();
		if (childs != null) {
			Integer i = 0;
			for (String child : childs) {
				ChildMenu childMenu = new ChildMenu();
				childMenu.setMenuid(i.toString());
				childMenu.setMenuname(child);
				childMenu.setUrl("subserver.html?name=" + child);
				childMenus.add(childMenu);
				i++;
			}
		}
		return childMenus;
	}

	private String getServerPath(HttpServletRequest request) {
		String server = request.getSession().getAttribute("server").toString();
		String port = request.getSession().getAttribute("port").toString();
		return String.format("%s:%s", server, port);
	}

	/**
	 * 获取ZkClient对象
	 * 
	 * @param request
	 * @return
	 */
	private ZkClient getZkClient(HttpServletRequest request) {
		String server = request.getSession().getAttribute("server").toString();
		String port = request.getSession().getAttribute("port").toString();
		ZkClient zkClient = new ZkClient(server + ":" + port);
		return zkClient;
	}

	private void closeZkClient(ZkClient zkClient) {
		if (zkClient != null) {
			zkClient.close();
		}
	}

}
