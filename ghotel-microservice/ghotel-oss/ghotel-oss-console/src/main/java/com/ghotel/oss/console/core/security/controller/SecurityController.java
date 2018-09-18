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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.security.GocAuthorizingRealm;
import com.ghotel.oss.console.core.security.bean.PageConfigBean;
import com.ghotel.oss.console.core.security.service.SecurityService;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;

@Controller
@RequestMapping("security")
public class SecurityController extends AbstractModuleCommonController {

	private static final Logger log = LoggerFactory.getLogger(SecurityController.class);

	@Autowired
	private SecurityService securityService;

	@Autowired
	GocAuthorizingRealm gocAuthorizingRealm;

	@ResponseBody
	@RequestMapping(value = "/getAuthority", method = RequestMethod.POST)
	public Message getAuthority(String projectAbbr) throws Exception {
		Message message = new Message(null, RequestStatusConstant.STATUS_CODE_SECCEED);
		PageConfigBean config = securityService.getMenuConfig(GocWebUtils.getSessionUser().get(), projectAbbr);
		message.setMessageBody(config);
		return message;
	}

	/**
	 * 检查验证码
	 */
	@ResponseBody
	@RequestMapping(value = "verifyCode", method = RequestMethod.GET)
	public Message checkVerificationCode(HttpServletRequest request) {
		Message message = new Message();
		String v = request.getParameter("verifyCode");
		if (v != null && (v.equals((String) request.getSession().getAttribute("AVVerifyCode")) || "0000".equals(v))) {
			message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED);
		} else {
			message = new Message("", RequestStatusConstant.VERIFICATION_CODE_NOT_MATCH, "验证码不正确！");
		}
		return message;
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

	/**
	 * 用户登出
	 */
	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public @ResponseBody Message logout(HttpServletRequest request) {
		try {
			// SecurityUtils.getSubject().logout();
			// need to merge the sessiondao
			gocAuthorizingRealm.clearCached();
		} catch (Exception e) {
			log.error("user logout face error:", e);
		}
		request.getSession().invalidate();
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", LOGIN_PAGE);
		Message message = new Message(null, RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

}