package com.ghotel.oss.console.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.ghotel.oss")
public class GocConsoleApplication {
	public static void main(String[] args) {
		ApplicationContext ac = SpringApplication.run(GocConsoleApplication.class, args);
	};
}
