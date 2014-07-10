/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.untils.menu;

import java.util.ArrayList;
import java.util.List;

import com.google.common.base.Preconditions;

/**
 * 父级菜单
 * 
 * @author jeffreywu 2013-6-19 上午10:43:00
 */
public class ParentMenu extends Menu {

	/**
	 * 版本
	 */
	private static final long serialVersionUID = 101001010L;

	public ParentMenu() {
		icon = "icon-sys";
	}

	/**
	 * 子级菜单
	 */
	private List<ChildMenu> menus;

	/**
	 * @return the menus
	 */
	public List<ChildMenu> getMenus() {
		return menus;
	}

	/**
	 * @param menus
	 *            the menus to set
	 */
	public void setMenus(List<ChildMenu> menus) {
		this.menus = menus;
	}

	/**
	 * 转换对象
	 * 
	 * @param permission
	 */
	public static ParentMenu BuildeParentMenu(String name) {
		Preconditions.checkNotNull(name);
		ParentMenu parentMenu = new ParentMenu();
		parentMenu.setMenuid("1");
		parentMenu.setMenuname(name);
		parentMenu.setMenus(new ArrayList<ChildMenu>());
		return parentMenu;
	}
}
