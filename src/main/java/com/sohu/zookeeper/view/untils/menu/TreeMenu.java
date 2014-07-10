/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.untils.menu;

import java.io.Serializable;
import java.util.List;

/**
 * @author jeffreywu
 * 
 */
public class TreeMenu implements Serializable {

	/**
	 * 版本
	 */
	private static final long serialVersionUID = 1010011001L;

	private int id;

	private String text;

	private String iconCls;

	private List<TreeMenu> children;

	private Attributes attributes;

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * @return the iconCls
	 */
	public String getIconCls() {
		return iconCls;
	}

	/**
	 * @return the children
	 */
	public List<TreeMenu> getChildren() {
		return children;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @param text
	 *            the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * @param iconCls
	 *            the iconCls to set
	 */
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	/**
	 * @param children
	 *            the children to set
	 */
	public void setChildren(List<TreeMenu> children) {
		this.children = children;
	}

	/**
	 * @return the attributes
	 */
	public Attributes getAttributes() {
		return attributes;
	}

	/**
	 * @param attributes
	 *            the attributes to set
	 */
	public void setAttributes(Attributes attributes) {
		this.attributes = attributes;
	}

}
