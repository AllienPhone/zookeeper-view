/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view;

import org.junit.Assert;
import org.junit.Test;

import com.sohu.zookeeper.view.untils.PingUntils;

/**
 * @author jeffreywu
 * 
 */
public class PingUnitlsUnitTest {

	@Test
	public void ping() {
		System.out.print(PingUntils.Ping("www.baidu.com"));
	}

}
