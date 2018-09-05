package com.ghotel.oss.console.core.common.file;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

public class CouponFileHandler implements FileHandler {

	@Override
	public void proceedFileUpload(MultipartFile file,HttpServletRequest request,  HttpServletResponse response) {

	}

	@Override
	public void proceedFileDownload(HttpServletRequest request,  HttpServletResponse response) {
		// TODO Auto-generated method stub

	}

}
