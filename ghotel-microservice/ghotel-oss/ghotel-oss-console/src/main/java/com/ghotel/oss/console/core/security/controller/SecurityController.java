package com.ghotel.oss.console.core.security.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.security.GocAuthorizingRealm;
import com.ghotel.oss.console.core.security.bean.PageConfigBean;
import com.ghotel.oss.console.core.security.service.SecurityService;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.core.utils.StringUtil;

@Controller
@RequestMapping("security")
public class SecurityController extends AbstractModuleCommonController {

	private static final Logger log = LoggerFactory.getLogger(SecurityController.class);

	@Autowired
	private SecurityService securityService;

	@Autowired
	GocAuthorizingRealm gocAuthorizingRealm;

	/**
	 * 用户登录 formSubmit
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public @ResponseBody Message login(HttpServletRequest request, @RequestParam String username,
			@RequestParam String password, @RequestParam(required = false) String returnURL,
			@RequestParam("__txtVerifyCode") String submitCode, @SessionAttribute("AVVerifyCode") String verifyCode) {

		Map<String, String> returnParams = new HashMap<String, String>();
		String resultPageURL = "";
		if (null == returnURL || "".equals(returnURL) || "null".equals(returnURL)) {
			resultPageURL += "/index.html";
		} else {
			resultPageURL = returnURL.substring(returnURL.indexOf("CMC") + 3); // .....有问题
		}

		Subject currentUser = SecurityUtils.getSubject();
		returnParams.put("url", resultPageURL);
		if (currentUser.isAuthenticated()) {
			return new Message(null, RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		}
		if (returnURL == null)
			returnURL = "";
		// String result = doLogin(request, username, password, verifyCode, submitCode);
		// if ("".equals(result) || null == result) {
		// return new Message(null, RequestStatusConstant.PAGE_NAVIGATION_ON,
		// returnParams);
		// } else {
		// return new Message(null, RequestStatusConstant.STATUS_CODE_FAILED, result);
		// }

		Message result = loginProcessor(request, username, password, verifyCode, submitCode);
		if (result.getStatusCode() == RequestStatusConstant.STATUS_CODE_SECCEED) {
			result.setStatusCode(RequestStatusConstant.PAGE_NAVIGATION_ON);
			result.setMessageBody(returnParams);
		}
		return result;
	}

	/**
	 * 用户登录
	 */
	@RequestMapping(value = "ajaxLogin", method = RequestMethod.POST)
	public @ResponseBody Message ajaxLogin(HttpServletRequest request, @RequestParam String username,
			@RequestParam String password, @RequestParam(required = false) String returnURL,
			@RequestParam(name = "__txtVerifyCode") String submitCode,
			@SessionAttribute(name = "AVVerifyCode") String verifyCode) {
		// String errorMessage = "";
		//
		// // 获取用户请求表单中输入的验证码
		// log.info("用户[" + username + "]登录时输入的验证码为[" + submitCode +
		// "],HttpSession中的验证码为[" + verifyCode + "]");
		// // "0000"为测试验证码
		// if (!"0000".equals(submitCode)) {
		// if (null == verifyCode || (!verifyCode.equals(submitCode))) {
		// errorMessage = "验证码不正确，请重新输入！";
		// this.message = new Message(null,
		// RequestStatusConstant.VERIFICATION_CODE_NOT_MATCH, errorMessage);
		// return message;
		// }
		// }
		//
		// errorMessage = loginProcessor(request, username, password);
		// if ("".equals(errorMessage) || null == errorMessage) {
		// this.message = new Message(null, RequestStatusConstant.STATUS_CODE_SECCEED,
		// loginProcessor(request, username, password));
		// } else {
		// this.message = new Message(null, RequestStatusConstant.LOGIN_FAILED,
		// errorMessage);
		// }

		return loginProcessor(request, username, password, verifyCode, submitCode);
	}

	@ResponseBody
	@RequestMapping(value = "/getAuthority", method = RequestMethod.POST)
	public Message getAuthority(HttpServletRequest request) {
		String username = request.getParameter("username");
		String projectAbbr = request.getParameter("projectAbbr");
		this.message = new Message(null, RequestStatusConstant.STATUS_CODE_SECCEED);
		PageConfigBean config = securityService.getMenuConfig(username, projectAbbr);
		this.message.setMessageBody(config);
		return this.message;
	}

	/**
	 * 检查验证码
	 */
	@ResponseBody
	@RequestMapping(value = "verifyCode", method = RequestMethod.GET)
	public Message checkVerificationCode(HttpServletRequest request) {
		String v = request.getParameter("verifyCode");
		if (v != null && (v.equals((String) request.getSession().getAttribute("AVVerifyCode")) || "0000".equals(v))) {
			message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED);
		} else {
			message = new Message("", RequestStatusConstant.VERIFICATION_CODE_NOT_MATCH, "验证码不正确！");
		}
		return this.message;
	}

	/**
	 * 生产临时验证码图片
	 */
	@RequestMapping(value = "generateImage")
	public void generateVerificationCodeImage(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		response.setContentType("image/jpeg");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		HttpSession session = request.getSession();

		// 在内存中创建图象
		int width = 60, height = 20;
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

		// 获取图形上下文
		Graphics g = image.getGraphics();

		// 生成随机类
		Random random = new Random();

		// 设定背景色
		// g.setColor(getRandColor(200,250));
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, width, height);

		// 设定字体
		g.setFont(new Font("Times New Roman", Font.PLAIN, 18));

		// 画边框
		// g.setColor(new Color());
		// g.drawRect(0, 0, width-1, height-1);

		// 随机产生155条干扰线，使图象中的认证码不易被其它程序探测到
		// g.setColor(getRandColor(0,0));
		g.setColor(Color.BLACK);
		for (int i = 0; i < 5; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}

		// 取随机产生的认证码(4位数字)
		String sRand = "";
		for (int i = 0; i < 4; i++) {
			String rand = String.valueOf(random.nextInt(10));
			sRand += rand;
			// 将认证码显示到图象中
			// g.setColor(new
			// Color(20+random.nextInt(110),20+random.nextInt(110),20+random.nextInt(110)));
			g.setColor(Color.BLACK);
			// 调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成
			g.drawString(rand, 13 * i + 6, 16);
		}

		// 将认证码存入SESSION
		session.setAttribute("AVVerifyCode", sRand);

		// 图象生效
		g.dispose();
		// 输出图象到页面
		ImageIO.write(image, "JPEG", response.getOutputStream());
	}

	private Message loginProcessor(HttpServletRequest request, String username, String password, String verifyCode,
			String submitCode) {
		String messageBody = null;
		int statusCode = 0;
		log.info("用户[" + username + "]登录时输入的验证码为[" + submitCode + "],HttpSession中的验证码为[" + verifyCode + "]");
		if (!"0000".equals(submitCode)) {
			if (null == verifyCode || !verifyCode.equals(submitCode)) {
				messageBody = "验证码不正确，请重新输入！";
				statusCode = RequestStatusConstant.VERIFICATION_CODE_NOT_MATCH;
			}
		}

		if (messageBody == null) {
			if (StringUtil.isNullOrBlank(username) || StringUtil.isNullOrBlank(password)) {
				messageBody = "亲~ 请输入用户名或密码！";
				statusCode = RequestStatusConstant.LOGIN_FAILED;
			} else {
				String host = GocWebUtils.getIPAddress(request);
				// UsernamePasswordToken token = new UsernamePasswordToken(username, password,
				// host);
				// TODO
				UsernamePasswordToken token = new UsernamePasswordToken(username, password, "127.0.0.1");
				// token.setRememberMe(true);
				// 获取当前的Subject
				Subject currentUser = SecurityUtils.getSubject();
				try {
					log.info("对用户[" + username + "]进行登录验证..验证开始");
					// currentUser.login(token);
					log.info("对用户[" + username + "]进行登录验证..验证通过");
					// request.getSession().setAttribute("userName", username);
					statusCode = RequestStatusConstant.STATUS_CODE_SECCEED;
				} catch (UnknownAccountException uae) {
					log.info("对用户[" + username + "]进行登录验证..验证未通过,未知账户");
					messageBody = uae.getMessage();
					statusCode = RequestStatusConstant.LOGIN_FAILED;
				} catch (IncorrectCredentialsException ice) {
					log.info("对用户[" + username + "]进行登录验证..验证未通过,错误的凭证");
					messageBody = "您输入的密码不正确！";
					statusCode = RequestStatusConstant.LOGIN_FAILED;
				} catch (LockedAccountException lae) {
					messageBody = lae.getMessage();
					statusCode = RequestStatusConstant.LOGIN_FAILED;
				} catch (ExcessiveAttemptsException eae) {
					log.info("对用户[" + username + "]进行登录验证..验证未通过,错误次数过多");
					messageBody = "用户名或密码错误次数过多";
					statusCode = RequestStatusConstant.LOGIN_FAILED;
				} catch (AuthenticationException ae) {
					// 通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
					log.info("对用户[" + username + "]进行登录验证..验证未通过,堆栈轨迹如下");
					log.error("", ae);
					messageBody = "很抱歉耽误您的时间，您的身份认证有误，请联系系统管理员求助！";
					statusCode = RequestStatusConstant.LOGIN_FAILED;
				} catch (Exception e) {
					log.error("", e);
					messageBody = "很抱歉耽误您的时间，登录请求失败，请联系系统管理员！";
					statusCode = RequestStatusConstant.LOGIN_FAILED;
				}

				// 验证是否登录成功
				if (currentUser.isAuthenticated()) {
					log.info("用户[" + username + "]登录认证通过(这里可以进行一些认证通过后的一些系统参数初始化操作)");
				} else {
					token.clear();
				}
			}
		}

		return new Message(null, statusCode, messageBody);

	}

	/**
	 * 用户登出
	 */
	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public @ResponseBody Message logout(HttpServletRequest request) {
		try {
			// SecurityUtils.getSubject().logout();
			gocAuthorizingRealm.clearCached();
		} catch (Exception e) {
		}
		request.getSession().invalidate();
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", LOGIN_PAGE);
		this.message = new Message(null, RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return this.message;
	}

}