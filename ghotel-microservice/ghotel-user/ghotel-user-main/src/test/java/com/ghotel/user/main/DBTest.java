package com.ghotel.user.main;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ghotel.model.po.Account;
import com.ghotel.model.po.User;
import com.ghotel.user.data.main.repository.AccountRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DBTest {

	@Autowired
	AccountRepository accountRepository;

	@Test
	public void testCascadingSave() {
		Account account = new Account();
		User user = new User();

		Date date = new Date();
		user.setCreateDate(date);
		user.setLastUpdateDate(date);
		user.setName("user1");

		account.setAssociateUser(user);
		account.setName("account1");

		for (Account a : accountRepository.findAll()) {
			System.out.println(a.getId());
		}
		accountRepository.save(account);
	}

}
