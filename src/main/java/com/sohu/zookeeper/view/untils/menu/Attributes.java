/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.untils.menu;

import java.io.Serializable;

/**
 * @author jeffreywu
 * 
 */
public class Attributes implements Serializable {

	/**
	 * 版本
	 */
	private static final long serialVersionUID = 1000001010L;
	private String path;

	public Attributes(String path) {
		this.path = path;
	}

	/**
	 * @return the path
	 */
	public String getPath() {
		return path;
	}

	/**
	 * @param path
	 *            the path to set
	 */
	public void setPath(String path) {
		this.path = path;
	}

}
