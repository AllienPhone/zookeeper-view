/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.untils.menu;

import java.util.Date;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SimpleDateFormatSerializer;

/**
 * Json工具类
 * @author jeffreywu 2013-5-27 下午3:42:20
 */
public class JsonParser {
    private static SerializeConfig mapping = new SerializeConfig();
    static {
        mapping.put(Date.class, new SimpleDateFormatSerializer("yyyy-MM-dd"));
    }
        
    /**
     * 最简单序列化为Json数据
     * @param ojbObject
     * @return
     */
    public static String simpleJson(Object ojbObject)
    {
        return JSON.toJSONString(ojbObject,mapping);
    }
}
