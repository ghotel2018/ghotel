package com.ghotel.oss.clawer.util;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumUtil {

	private static String seleniumDriverPath;

	public static String getSeleniumDriverPath() {
		return seleniumDriverPath;
	}

	public static void setSeleniumDriverPath(String seleniumDriverPath) {
		SeleniumUtil.seleniumDriverPath = seleniumDriverPath;
	}

	public static WebDriver getWebDriverInstance() {

		System.setProperty("webdriver.gecko.driver", getSeleniumDriverPath());

		return new ChromeDriver();

	}

	public static void setElementValue(WebElement element, String value) {
		element.sendKeys(Keys.HOME, Keys.chord(Keys.SHIFT, Keys.END), value);// method2
	}
}
