package com.ghotel.oss.clawer;

import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
@EnableAutoConfiguration
public class Application {
	public static void main(String[] args) throws Exception {
		ApplicationContext ac = SpringApplication.run(Application.class, args);
		// ac.getBean(CtripClawer.class).ClawAllChangShaHotelInfo();
		// List<HotelPO> hotels = ac.getBean(HotelRepository.class).findAll();
		//
		// for (HotelPO hotel : hotels) {
		// System.out.println(hotel.getId());
		// }
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		// ac.getBean(CtripClawer.class).clawChangShaHotelSaleInfo("1250258", new
		// Date(), 2);
		// ac.getBean(CtripClawer.class).clawSpecifyChangShaHotelOneYearSaleInfo("1004134");
		ac.getBean(CtripClawer.class).clawAllChangShaHotelOneYearSaleInfo();

	}
}
