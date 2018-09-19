package com.ghotel.oss.console.core.common.file;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

public interface FileHandler {

	public void proceedFileUpload(MultipartFile file, HttpServletRequest request, HttpServletResponse response);

	public void proceedFileDownload(HttpServletRequest request, HttpServletResponse response);

}
