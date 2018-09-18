package com.ghotel.oss.console.core;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ghotel.model.po.user.ContactInfo;
import com.ghotel.model.po.user.ContactInfoType;
import com.ghotel.model.po.user.User;
import com.ghotel.oss.console.modules.user.dao.UserRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@EnableAutoConfiguration(exclude = { MongoAutoConfiguration.class, MongoDataAutoConfiguration.class })
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DBTest {
	@Autowired
	UserRepository userRepository;

	@Test
	public void testSaveObjWithEmun() {
		List<ContactInfo> cl = new ArrayList<>();
		ContactInfo ci = new ContactInfo();
		ci.setType(ContactInfoType.ADDRESS);
		ci.setValue("address");
		cl.add(ci);

		User user = new User();
		user.setName("123");
		user.setContacts(cl);

		userRepository.save(user);
	}

}
