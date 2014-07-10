package com.sohu.zookeeper.view.untils.menu;

import java.io.Serializable;
import java.util.List;

/**
 * @author jeffreywu 2013-6-19 上午11:34:54
 */
public class MenuJson implements Serializable {

    /**
     * 版本
     */
    private static final long serialVersionUID = 1010110100L;

    public MenuJson(List<ParentMenu> parentMenus) {
        this.menus = parentMenus;
    }

    /**
     * 菜单
     */
    private List<ParentMenu> menus;

    /**
     * @return the menus
     */
    public List<ParentMenu> getMenus() {
        return menus;
    }

    /**
     * @param menus the menus to set
     */
    public void setMenus(List<ParentMenu> menus) {
        this.menus = menus;
    }

    /**
     * 生成JSON数据
     * 
     * @return
     */
    public String buildJson() {
        if (this.menus != null) {
            return JsonParser.simpleJson(this);
        }
        return "";
    }
}
