package com.ghotel.oss.clawer;

import cn.edu.hfut.dmic.webcollector.model.CrawlDatums;
import cn.edu.hfut.dmic.webcollector.model.Page;
import cn.edu.hfut.dmic.webcollector.plugin.berkeley.BreadthCrawler;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ghotel.oss.clawer.po.HotelPO;
import com.ghotel.oss.clawer.repository.HotelDianpingRepository;
import com.ghotel.oss.clawer.util.SpringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

/**
 * Created by Administrator on 2018/7/27.
 */
public class DianpingCrawler extends BreadthCrawler {

    private HotelDianpingRepository hotelDianpingRepository = SpringUtil.getBean(HotelDianpingRepository.class);

    private Logger logger = LoggerFactory.getLogger(DianpingCrawler.class);

    public DianpingCrawler(String crawlPath, boolean autoParse) {
        super(crawlPath, autoParse);
        /*start pages*/
        for (int pageIndex = 1; pageIndex <= 50; pageIndex++) {
            String seedUrl = String.format("http://www.dianping.com/changsha/hotel/p%d/", pageIndex);
            this.addSeed(seedUrl);
        }

        /*fetch url like "https://blog.github.com/2018-07-13-graphql-for-octokit/" */
        //this.addRegex("https://blog.github.com/[0-9]{4}-[0-9]{2}-[0-9]{2}-[^/]+/");
        /*do not fetch jpg|png|gif*/
        //this.addRegex("-.*\\.(jpg|png|gif).*");
        /*do not fetch url contains #*/
        //this.addRegex("-.*#.*");

        setThreads(1);
        getConf().setTopN(100);

        //enable resumable mode
        //setResumable(true);
    }

    @Override
    public void visit(Page page, CrawlDatums crawlDatums) {
        String url = page.url();
        String html = page.html();
        if (StringUtils.hasText(html)) {
            String[] dataJsonArr = html.split("window.__INITIAL_STATE__ =");
            String dataJsonStr = dataJsonArr[1];
            dataJsonArr = dataJsonStr.split("window._DP_HeaderData");
            dataJsonStr = dataJsonArr[0];
            saveToDb(dataJsonStr.replaceAll(";", ""));
        }
    }

    private void saveToDb(String jsonData) {
        JSONObject jsonObject = JSONObject.parseObject(jsonData);
        JSONArray jsonArray = jsonObject.getJSONObject("hotelList").getJSONArray("records");
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject jsonHotelObject = jsonArray.getJSONObject(i);
            HotelPO hotel = new HotelPO();
            hotel.setCanBook(jsonHotelObject.getBoolean("isBookable"));
            hotel.setDistanceText(jsonHotelObject.getString("distanceText"));
            hotel.setHotelId(jsonHotelObject.getString("id"));
            hotel.setHotelName(jsonHotelObject.getString("shopName"));
            hotel.setMinPrice(jsonHotelObject.getLong("price"));
            hotel.setHotelZone(jsonHotelObject.getString("regionName"));
            hotel.setReviewCount(jsonHotelObject.getLong("reviewCount"));
            hotel.setStar(jsonHotelObject.getLong("star"));
            hotel.setId("DIANPING_"+hotel.getHotelId());
            HotelPO result = hotelDianpingRepository.insert(hotel);
            logger.info("insert to mongo ,ota:dianping, hotel name:{},id:{}",hotel.getHotelName(),result.getId());
        }
    }

}
