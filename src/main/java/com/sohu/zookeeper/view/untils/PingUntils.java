/**
 * Copyright (c) 2012 Sohu TV. All right reserved.
 */
package com.sohu.zookeeper.view.untils;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * @author jeffreywu
 * 
 */
public class PingUntils {

	public static boolean Ping(String server,int port) {
		Boolean result = false;
		Socket t = null;
		try {
			t = new Socket(server, port);
			DataInputStream dis = new DataInputStream(t.getInputStream());
			PrintStream ps = new PrintStream(t.getOutputStream());
			ps.println("Hello");
			String str = dis.readLine();
			if (str.equals("Hello"))
				result = true;
			else
				result = false;
		} catch (IOException e) {
			e.printStackTrace();
			result = false;
		} finally {
			if (t != null) {
				try {
					t.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	public static String Ping(String IP) {
		BufferedReader in = null;
		Runtime rt = Runtime.getRuntime();
		boolean FoundMatch = false;
		String pingCommand = "ping " + IP + " -w " + 3000;
		try {
			Process pro = rt.exec(pingCommand);
			in = new BufferedReader(new InputStreamReader(pro.getInputStream()));
			String line = in.readLine();
			while (line != null) {
				try {
					Pattern Regex = Pattern.compile("(T|t){2}(L|l)", Pattern.CANON_EQ);
					Matcher RegexMatcher = Regex.matcher(line);
					FoundMatch = RegexMatcher.find();
					if (FoundMatch) {
						pro.destroy();
						return IP.trim();
					}
				} catch (PatternSyntaxException ex) {
					// Syntax error in the regular expression
					ex.getMessage();
				}
				line = in.readLine();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println(e.getMessage());
		}
		return null;
	}

}
