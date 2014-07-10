/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.model;

import java.util.List;

/**
 * ZK Directory Info
 * 
 * @author jeffreywu
 * 
 */
public class ZkDirectory {

	private String name;

	private byte[] data;

	private List<ZkDirectory> childs;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return the data
	 */
	public byte[] getData() {
		return data;
	}

	/**
	 * @return the childs
	 */
	public List<ZkDirectory> getChilds() {
		return childs;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @param data
	 *            the data to set
	 */
	public void setData(byte[] data) {
		this.data = data;
	}

	/**
	 * @param childs
	 *            the childs to set
	 */
	public void setChilds(List<ZkDirectory> childs) {
		this.childs = childs;
	}

}
