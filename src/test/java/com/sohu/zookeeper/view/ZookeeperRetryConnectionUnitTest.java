/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view;

import java.io.IOException;

import org.apache.zookeeper.ZooKeeper;
import org.junit.Test;

/**
 * @author jeffreywu
 * 
 */
public class ZookeeperRetryConnectionUnitTest {

	@Test
	public void retryConnection() throws IOException {
		
		ZooKeeper zooKeeper=new ZooKeeper("10.1.5.94:2181", 5000, null);
		System.out.print(zooKeeper.getState().isAlive());
		
		

	}

}
