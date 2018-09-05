package com.ghotel.portal.security.realm;

import java.util.Optional;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.ghotel.model.po.Account;
import com.ghotel.portal.security.repository.AccountRepository;

public class MongoDBRealm extends AuthorizingRealm {
	@Autowired
	AccountRepository accountRepository;

	@Override
	public String getName() {
		return "GHOTEL-MONGODB-REALM";
	}

	@Override
	public boolean supports(AuthenticationToken token) {
		// 仅支持 UsernamePasswordToken 类型的 Token
		return token instanceof UsernamePasswordToken;
	}

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		String username = (String) token.getPrincipal(); // 得到用户名
		String password = new String((char[]) token.getCredentials()); // 得到密码

		Account account = Optional.ofNullable(accountRepository.findFirstByName(username))
				.orElseThrow(() -> new UnknownAccountException());
		
		return Optional.ofNullable(account).filter(a -> password.equals(a.getPassword())).map(a -> {
			return new SimpleAuthenticationInfo(username, password, getName());
		}).orElseThrow(() -> new IncorrectCredentialsException());

		// Optional<Account> account = accountRepository.findFirstByName(username);
		// if (!account.isPresent()) {
		// throw new UnknownAccountException(); // 如果用户名错误
		// }
		// if (!account.get().getPassword().equals(password)) {
		// throw new IncorrectCredentialsException(); // 如果密码错误
		// }
		// // 如果身份认证验证成功，返回一个 AuthenticationInfo 实现;
		// return new SimpleAuthenticationInfo(username, password, getName());
	}

}
