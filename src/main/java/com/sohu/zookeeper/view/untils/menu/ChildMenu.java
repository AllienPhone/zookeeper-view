/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.untils.menu;

import com.google.common.base.Preconditions;

/**
 * 子级菜单
 * 
 * @author jeffreywu 2013-6-19 上午10:45:45
 */
public class ChildMenu extends Menu {

    /**
     * 版本
     */
    private static final long serialVersionUID = 10101010L;

    public ChildMenu() {
        icon = "icon-nav";
    }

    /**
     * URL地址
     */
    private String url;

    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * 转换为childMenu
     * 
     * @param permission
     * @return
     */
    public static ChildMenu BuildeChildMenu(String name) {
        Preconditions.checkNotNull(name);
        ChildMenu childMenu = new ChildMenu();
        childMenu.setMenuid("1");
        childMenu.setMenuname(name);
        childMenu.setUrl("subserver.html?name="+name);
        return childMenu;
    }
}
