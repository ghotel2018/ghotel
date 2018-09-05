package com.ghotel.oss.console.core.utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.FileUtils;

public class FileUtil {
	
	public static void copyStreamToFile(InputStream is , String fileName) throws IOException{
			FileUtils.copyInputStreamToFile(is, new File(fileName));
	}
	
}
