package com.ghotel.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
@EnableAutoConfiguration
public class PortalApplication {
	public static void main(String[] args) {
		ApplicationContext ac = SpringApplication.run(PortalApplication.class, args);

	}
}
