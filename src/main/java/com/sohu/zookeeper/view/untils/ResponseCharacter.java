/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.untils;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.google.common.base.Strings;

/**
 * @author jeffreywu 2013-8-23 下午2:44:39
 */
public class ResponseCharacter {
    public static void writeResult(HttpServletResponse response, String result, String encoder) {
        try {
            if (encoder == null)
                encoder = "UTF-8";
            response.setCharacterEncoding(encoder);
            response.setContentType("textml;charset=" + encoder);
            ServletOutputStream out = response.getOutputStream();
            byte[] b = result.getBytes(encoder);
            out.write(b);
        } catch (IOException e) {
        }
    }

    /**
     * callback数据处理
     * 
     * @param result
     * @param callback
     * @return
     */
    public static String CallBackResult(String result, String callback) {
        if (Strings.isNullOrEmpty(callback))
            callback = "a";
        result = String.format("var %s=%s", callback, result);
        return result;
    }

    /**
     * callback数据处理
     * 
     * @param result
     * @param callback
     * @return
     */
    public static String CallBackResultJsonP(String result, String callback) {
        if (Strings.isNullOrEmpty(callback))
            callback = "a";
        result = String.format("%s(%s)", callback, result);
        return result;
    }
}
