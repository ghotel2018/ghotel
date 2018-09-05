package com.ghotel.oss.clawer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ghotel.oss.clawer.util.SeleniumUtil;

@Component
public class Initializer {

	public Initializer(@Value("${clawer.ctrip.path.selenium}") String seleniumDriverPath) {
		SeleniumUtil.setSeleniumDriverPath(seleniumDriverPath);
	}

}