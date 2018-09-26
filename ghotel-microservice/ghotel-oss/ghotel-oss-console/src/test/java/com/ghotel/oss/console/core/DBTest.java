package com.ghotel.oss.console.core;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.mapping.MongoPersistentEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.UntypedExampleMatcher;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ghotel.model.po.user.Account;
import com.ghotel.model.po.user.ContactInfo;
import com.ghotel.model.po.user.ContactInfoType;
import com.ghotel.model.po.user.User;
import com.ghotel.oss.console.core.utils.GocJsonUtil;
import com.ghotel.oss.console.modules.ghotel.user.dao.AccountRepository;
import com.ghotel.oss.console.modules.ghotel.user.dao.UserRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@EnableAutoConfiguration(exclude = { MongoAutoConfiguration.class, MongoDataAutoConfiguration.class })
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DBTest {
	@Autowired
	UserRepository userRepository;
	@Autowired
	AccountRepository accountRepository;

	@Autowired
	private ApplicationContext appContext;

	public MongoOperations getMongoOperations(Class<?> entityClass) {
		Iterator<MongoOperations> mongoOperationsIterator = appContext.getBeansOfType(MongoOperations.class).values()
				.iterator();
		while (mongoOperationsIterator.hasNext()) {
			MongoOperations mongoOperations = mongoOperationsIterator.next();

			String collectionName = mongoOperations.getConverter().getMappingContext()
					.getRequiredPersistentEntity(entityClass).getCollection();
			Iterator<? extends MongoPersistentEntity<?>> persistentEntitiesIterator = mongoOperations.getConverter()
					.getMappingContext().getPersistentEntities().iterator();

			while (persistentEntitiesIterator.hasNext()) {
				MongoPersistentEntity<?> entity = persistentEntitiesIterator.next();
				if (entity.getCollection().equals(collectionName)) {
					return mongoOperations;
				}
			}
		}
		return null;
	}

	@Test
	public void testSaveObjWithEmun() throws Exception {
		Account account = new Account();
		account.setName("ta2");

		List<ContactInfo> cl = new ArrayList<>();
		ContactInfo ci = new ContactInfo();
		ci.setType(ContactInfoType.ADDRESS);
		ci.setValue("123");
		cl.add(ci);

		ci = new ContactInfo();
		ci.setType(ContactInfoType.ADDRESS);
		ci.setValue("345");
		cl.add(ci);
		cl.add(ci);

		ci = new ContactInfo();
		ci.setType(ContactInfoType.ADDRESS);
		ci.setValue("367");
		cl.add(ci);

		User user = new User();
		user.setName("ttt");
		user.setContacts(cl);

		account.setAssociateUser(user);

		accountRepository.save(account);

		User fu = new User();
		List<ContactInfo> fcl = new ArrayList<>();
		ContactInfo fc = new ContactInfo();
		fc.setValue("3");
		fcl.add(fc);
		fu.setContacts(fcl);

		List<User> result = userRepository.findAll(Example.of(fu, ExampleMatcher.matching().withIgnoreCase()
				.withStringMatcher(StringMatcher.CONTAINING).withIgnoreNullValues()));

		System.out.println(GocJsonUtil.beanToJson(result));
	}

	@Test
	public void testQuery() throws Exception {

		User fu = new User();
		fu.setName("ttt");
		List<ContactInfo> fcl = new ArrayList<>();
		ContactInfo fc = new ContactInfo();
		fc.setValue("123");
		fcl.add(fc);
		fu.setContacts(fcl);

//		List<User> result = userRepository.findAll(Example.of(fu, UntypedExampleMatcher.matching().withIgnoreCase()
//				.withStringMatcher(StringMatcher.CONTAINING).withIgnoreNullValues()));

		Query q = new Query(new Criteria().alike(Example.of(fu, UntypedExampleMatcher.matching().withIgnoreCase()
				.withStringMatcher(StringMatcher.CONTAINING).withIgnoreNullValues().withIgnorePaths("contacts"))));
		Criteria addedCriteria = new Criteria();
		addedCriteria.andOperator(Criteria.where("contacts.value").regex(".*123.*"))
				.orOperator(Criteria.where("contacts.value").regex(".*123.*"));
		q.addCriteria(Criteria.where("contacts.value").regex(".*123.*").orOperator(Criteria.where("contacts.value").regex(".*123.*")));
		List<User> result = getMongoOperations(User.class).find(q, User.class);
		System.out.println("***:" + GocJsonUtil.beanToJson(result));
	}

}
