/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.untils.menu;

import java.io.Serializable;

/**
 * @author jeffreywu 2013-6-19 上午10:38:58
 */
public abstract class Menu implements Serializable {

    /**
     * 版本
     */
    private static final long serialVersionUID = 101001010100L;

    /**
     * ID值
     */
    protected String menuid;

    /**
     * 名称
     */
    protected String menuname;

    /**
     * 图标
     */
    protected String icon;

    /**
     * @return the menuid
     */
    public String getMenuid() {
        return menuid;
    }

    /**
     * @param menuid the menuid to set
     */
    public void setMenuid(String menuid) {
        this.menuid = menuid;
    }

    /**
     * @return the menuname
     */
    public String getMenuname() {
        return menuname;
    }

    /**
     * @param menuname the menuname to set
     */
    public void setMenuname(String menuname) {
        this.menuname = menuname;
    }

    /**
     * @return the icon
     */
    public String getIcon() {
        return icon;
    }

    /**
     * @param icon the icon to set
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }
}
