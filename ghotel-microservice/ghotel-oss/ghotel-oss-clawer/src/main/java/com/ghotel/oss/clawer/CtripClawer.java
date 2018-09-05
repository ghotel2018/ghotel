package com.ghotel.oss.clawer;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.ExecuteWatchdog;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Component;

import com.ghotel.oss.clawer.po.HotelPO;
import com.ghotel.oss.clawer.po.PricePO;
import com.ghotel.oss.clawer.po.RoomPricePO;
import com.ghotel.oss.clawer.repository.HotelRepository;
import com.ghotel.oss.clawer.repository.RoomPriceRepository;
import com.ghotel.oss.clawer.util.SeleniumUtil;

@Component
public class CtripClawer {
	@Value("${clawer.ctrip.path.scrapyProject}")
	String scrapyProjectPath;
	@Value("${clawer.ctrip.command.scrapyHotelInfo}")
	String commandScrapyHotleInfo;

	@Autowired
	RoomPriceRepository roomPriceRepository;
	@Autowired
	HotelRepository hotelRepository;

	Logger logger = LoggerFactory.getLogger(getClass());

	private final static String DEFAULT_DATEFORMAT = "yyyy-MM-dd";
	private final static String ID_DATEFORMAT = "yyyyMMdd";
	private final static String CTRIP_HOTEL_DETAIL_PAGE_URL = "http://hotels.ctrip.com/hotel/{}.html?isFull=F";

	public void ClawAllChangShaHotelInfo() throws Exception {
		CommandLine cmdLine = CommandLine.parse(commandScrapyHotleInfo);
		DefaultExecutor executor = new DefaultExecutor();
		executor.setWorkingDirectory(new File(scrapyProjectPath));
		executor.setExitValue(1);
		ExecuteWatchdog watchdog = new ExecuteWatchdog(6000000);
		executor.setWatchdog(watchdog);
		executor.execute(cmdLine);
	}

	public void clawAllChangShaHotelOneYearSaleInfoWithCanBookReset() {
		logger.info("[CLAWALLONEYEAN] start to claw all hotels' info in one year with canBook reset");
		List<HotelPO> hotels = hotelRepository.findAll();
		for (HotelPO hotel : hotels) {
			hotel.setCanBook(true);
		}

		clawAllChangShaHotelOneYearSaleInfo();
		logger.info("[CLAWALLONEYEAN] finish to claw all hotels' info in one year with canBook reset");
	}

	public void clawAllChangShaHotelOneYearSaleInfo() {
		logger.info("[CLAWALLONEYEAN] start to claw all hotels' info in one year");
		List<HotelPO> hotelList = hotelRepository.findByCanBook(true);// .findAll(Sort.by(Order.desc("hotel_id")));

		for (HotelPO hotel : hotelList) {
			clawSpecifyChangShaHotelOneYearSaleInfo(hotel.getHotelId());
		}
		logger.info("[CLAWALLONEYEAN] finish to claw all hotels' info in one year");
	}

	public void clawSpecifyChangShaHotelOneYearSaleInfo(String hotelId) {
		logger.info("[CLAWONEYEAN] start to claw the hotel info in one year with hotelID:{}", hotelId);

		String clawDateStr = DateFormatUtils.format(new Date(), ID_DATEFORMAT);

		List<RoomPricePO> roomList = roomPriceRepository.findByHotelIdAndClawDateStr(hotelId, clawDateStr,
				Sort.by(Order.desc("priceDate")));
		Date lastDate = new Date();
		if (roomList.size() > 0) {
			lastDate = roomList.get(0).getPriceDate();
		}
		Date endDate = DateUtils.addYears(new Date(), 1);
		int days = new Long((endDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)).intValue();
		clawChangShaHotelSaleInfo(hotelId, lastDate, days);

		logger.info("[CLAWONEYEAN] finish to claw the hotel info in one year with hotelID:{}", hotelId);
	}

	public void clawChangShaHotelSaleInfo(String hotelId, Date startDate, int days) {
		logger.info("[CLAWHOTELINFO] start to claw the hotel info with hotelID:{},start date:{},days:{}", hotelId,
				startDate, days);

		WebDriver driver = SeleniumUtil.getWebDriverInstance();

		driver.get(CTRIP_HOTEL_DETAIL_PAGE_URL.replace("{}", hotelId));

		Date clawDate = new Date();

		// once opened update the hotel info
		addHotelInfo(driver, hotelId);

		for (int i = 0; i < days; i++) {
			logger.info("[CLAWHOTELINFO] start to claw the No.{} hotel info with hotelID:{},start date:{},days:{}", i,
					hotelId, startDate, days);
			try {
				// fresh first in order to claw as the startDate set
				freshSearchResult(driver, startDate);
				if (driver.findElements(By.cssSelector("#J_RoomListTbl tr")).size() < 3) {
					HotelPO hotel = hotelRepository.findByHotelId(hotelId);
					hotel.setCanBook(false);
					hotelRepository.save(hotel);
					break;
				}
				if (driver.findElement(By.id("J_hourNoResult")).isDisplayed()) {
					logger.info(
							"[CLAWHOTELINFO] finish to claw the No.{} hotel info with hotelID:{}, date:{},none data found!!!",
							i, hotelId, startDate);
				} else {
					clawPriceResult(driver, hotelId, clawDate, startDate);
					logger.info(
							"[CLAWHOTELINFO] finish to claw the No.{} hotel info with hotelID:{}, date:{},data saved!!!",
							i, hotelId, startDate);
				}

				// clawer next day
				startDate = DateUtils.addDays(startDate, 1);

			} catch (Exception e) {
				logger.info(
						"[CLAWHOTELINFO] finish to claw the No.{} hotel info with hotelID:{}, date:{},face exception:{}",
						i, hotelId, startDate, e);
			}
		}

		driver.quit();

		logger.info("[CLAWHOTELINFO] finish to claw the hotel info with hotelID:{},start date:{},days:{}", hotelId,
				startDate, days);
	}

	/**
	 * claw the room count from the detail page, then update these attributes to the
	 * database
	 * 
	 * @param driver
	 * @param hotelId
	 */
	private void addHotelInfo(WebDriver driver, String hotelId) {

		Integer roomCount = null;
		WebElement desc = driver.findElement(By.id("htlDes"));
		Pattern p = Pattern.compile("(\\d+)间房");
		Matcher m = p.matcher(desc.getText());

		if (m.find()) {
			roomCount = Integer.valueOf(m.group(1));
		}

		HotelPO hotel = hotelRepository.findByHotelId(hotelId);
		hotel.setRoomCount(roomCount);

		hotelRepository.save(hotel);
	}

	/**
	 * change the check in & out dates to get another day's info
	 * 
	 * @param driver
	 * @param startDate
	 */
	private void freshSearchResult(WebDriver driver, Date startDate) {

		WebElement checkIn = driver.findElement(By.id("cc_txtCheckIn"));
		WebElement checkOut = driver.findElement(By.id("cc_txtCheckOut"));
		WebElement changeBtn = driver.findElement(By.id("changeBtn"));
		Date checkOutDate = DateUtils.addDays(startDate, 1);

		SeleniumUtil.setElementValue(checkIn, DateFormatUtils.format(startDate, DEFAULT_DATEFORMAT));
		SeleniumUtil.setElementValue(checkOut, DateFormatUtils.format(checkOutDate, DEFAULT_DATEFORMAT));
		changeBtn.click();

		(new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
			public Boolean apply(WebDriver d) {
				return d.findElement(By.id("J_RoomListTbl")) != null;
			}
		});
	}

	/**
	 * union the id generate rule
	 * 
	 * @param clawDate
	 * @param priceDate
	 * @param hotelId
	 * @return
	 */
	private String generateRoomPriceId(Date clawDate, Date priceDate, String roomId) {
		return new StringBuilder().append(roomId).append(DateFormatUtils.format(priceDate, ID_DATEFORMAT))
				.append(DateFormatUtils.format(clawDate, ID_DATEFORMAT)).toString();
	}

	/**
	 * claw all rooms' price and save them
	 * 
	 * @param driver
	 * @param hotelId
	 * @param clawDate
	 * @param priceDate
	 */
	private void clawPriceResult(WebDriver driver, String hotelId, Date clawDate, Date priceDate) {
		List<WebElement> trList = driver.findElements(By.cssSelector("#J_RoomListTbl>tbody>tr[expand]"));

		List<RoomPricePO> roomList = new ArrayList<RoomPricePO>();
		RoomPricePO room = null;
		List<PricePO> priceList = null;

		for (WebElement tr : trList) {
			if (!tr.getAttribute("class").equals("tr-recommend last_room")) {
				List<WebElement> tdList = tr.findElements(By.tagName("td"));
				// adjust the index,as if the row without a picture, the td's index should sub 1
				int adjustIndex = 1;

				if (!tr.getAttribute("class").contains("unexpanded")) {
					adjustIndex = 0;
					if (room != null) {
						room.setPriceList(priceList);
						roomList.add(room);
					}

					room = new RoomPricePO();
					priceList = new ArrayList<PricePO>();

					String roomId = tdList.get(0).getAttribute("id");
					String roomName = tdList.get(0).findElements(By.tagName("a")).get(1).getText().replace("\n查看详情",
							"");

					room.setId(generateRoomPriceId(clawDate, priceDate, roomId));
					room.setHotelId(hotelId);
					room.setRoomId(roomId);
					room.setRoomName(roomName);

					room.setClawDate(clawDate);
					room.setClawDateStr(DateFormatUtils.format(clawDate, ID_DATEFORMAT));

					room.setPriceDate(priceDate);
					room.setPriceDateStr(DateFormatUtils.format(priceDate, ID_DATEFORMAT));
				}

				PricePO pricePO = new PricePO();

				String bedSize = tdList.get(2 - adjustIndex).getText();
				String breakfast = tdList.get(3 - adjustIndex).getText();
				String policy = tdList.get(6 - adjustIndex).findElements(By.tagName("span")).get(0).getText();
				Float price = Float.valueOf(
						tdList.get(7 - adjustIndex).findElement(By.className("base_price")).getText().substring(1));

				pricePO.setBedSize(bedSize);
				pricePO.setBreakfast(breakfast);
				pricePO.setPolicy(policy);
				pricePO.setPrice(price);
				pricePO.setStatus(getRoomStatus(tdList.get(8 - adjustIndex)));
				pricePO.setPayWay(getPayWay(tdList.get(8 - adjustIndex)));

				priceList.add(pricePO);
			}
		}

		roomPriceRepository.saveAll(roomList);
	}

	/**
	 * get the price's sale status from the page description
	 * 
	 * @param bookBT
	 * @return
	 */
	private int getRoomStatus(WebElement bookBT) {
		int status = CommonConstant.ROOM_PRICE_STATUS_RICH;
		String bookTdText = bookBT.getText();
		if (bookTdText.contains("订完")) {
			status = CommonConstant.ROOM_PRICE_STATUS_NO;
		} else if (bookTdText.contains("仅剩1间")) {
			status = CommonConstant.ROOM_PRICE_STATUS_LAST_ONE;
		} else if (bookTdText.contains("房量紧张")) {
			status = CommonConstant.ROOM_PRICE_STATUS_LACK;
		}

		return status;
	}

	/**
	 * get the price's pay way from the page description
	 * 
	 * @param bookBT
	 * @return
	 */
	private int getPayWay(WebElement bookBT) {
		int payWay = CommonConstant.PAY_WAY_OTHER;
		String bookTdText = bookBT.getText();
		if (bookTdText.contains("担保")) {
			payWay = CommonConstant.PAY_WAY_WARRANT;
		} else if (bookTdText.contains("在线付")) {
			payWay = CommonConstant.PAY_WAY_ONLINE;
		} else if (bookTdText.contains("到店付")) {
			payWay = CommonConstant.PAY_WAY_SHOP;
		}

		return payWay;
	}
}
