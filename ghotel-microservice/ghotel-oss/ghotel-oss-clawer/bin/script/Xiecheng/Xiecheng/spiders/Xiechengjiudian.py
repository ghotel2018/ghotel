# coding=utf-8
# -*- coding: utf-8 -*-
from Xiecheng.items import XiechengItem
import scrapy
import sys
import json

reload(sys)  # reload 才能调用 setdefaultencoding 方法  
sys.setdefaultencoding('utf-8')  # 设置 'utf-8' 


class XiechengjiudianSpider(scrapy.Spider):
    name = 'Xiechengjiudian'
    base_url = "http://hotels.ctrip.com/hotel/changsha206/p"
    offset = 1
    start_urls = [base_url + str(offset)]

    # hotel_name // h2[ @class ='hotel_name']/text()
    # hotel_img //a[@class='hotel_item_pic haspic']/img/@src
    # hotel_address //p[@class='hotel_item_htladdress']/text()
    # hotel_point //span[@class='hotel_value']/text()
    # hotel_judgement //span[@class='hotel_judgement']/span/text()
    # hotel_price //span[@class='J_price_lowList']/text()

    def parse(self, response):
        hotelData = {}
        hotelDataStr = response.text
        if 'hotelPositionJSON' in hotelDataStr:
            hotelDataStr = hotelDataStr[hotelDataStr.index('hotelPositionJSON'):]
            hotelDataStr = hotelDataStr[hotelDataStr.index('['):]
            hotelDataStr = hotelDataStr[0:hotelDataStr.index('mapIcon') ]
            hotelDataStr = hotelDataStr[1:hotelDataStr.rindex(']'):]
            hotelDataStr = '[' + hotelDataStr + ']'
            hotelData = json.loads(hotelDataStr)
        
        info_html = response.xpath("//div[@id='divNoresult']")
        if len(info_html) <= 0:
            node_list = response.xpath("//ul[@class='hotel_item']")
 
            for node in node_list:
                item = XiechengItem()
                
                if len(node.css(".detail_btn::attr(data-id)")) > 0:
                    id = node.css(".detail_btn::attr(data-id)").extract()[0]
                    item["hotelId"] = id
                    for hd in hotelData:
                        if hd["id"] == id:
                            item["hotelLat"] = hd['lat']
                            item["hotelLon"] = hd['lon']
                
                item["hotelZone"] = []
                if len(node.css(".hotel_item_htladdress a[tracekey='nhtllistroomclick']::text")) > 0:
                    for text in node.css(".hotel_item_htladdress a[tracekey='nhtllistroomclick']::text").extract():
                        item["hotelZone"].append(text)
                    
                if len(node.xpath(".//h2[@class ='hotel_name']/a/text()")) > 0:
                    item["hotelName"] = node.xpath(".//h2[@class ='hotel_name']/a/text()").extract()[0]
 
                if len(node.xpath(".//a/img/@src")) > 0:
                    item["hotelImg"] = node.xpath(".//a/img/@src").extract()[0]
 
                if len(node.xpath(".//p[@class='hotel_item_htladdress']/text()")) > 0:
                    str_address = "".join(node.xpath(".//p[@class='hotel_item_htladdress']/text()").extract())
                    if "】" in str_address:
                        str_address = str_address[str_address.index("】") + 1:]
                    item["hotelAddress"] = str_address
                    
                    district = ['天心区', '芙蓉区', '岳麓区', '开福区', '雨花区', '望城区']
                    for d in district:
                        if d in str_address:
                            item["hotelDistrict"] = d
                            break
 
                if len(node.xpath(".//span[@class='hotel_value']/text()")) > 0:
                    item["hotelPoint"] = node.xpath(".//span[@class='hotel_value']/text()").extract()[0]
 
                if len(node.xpath(".//span[@class='hotel_judgement']/span/text()")) > 0:
                    item["hotelJudgement"] = node.xpath(".//span[@class='hotel_judgement']/span/text()").extract()[0]
 
                if len(node.xpath(".//span[@class='J_price_lowList']/text()")) > 0:
                    item["hotelPrice"] = node.xpath(".//span[@class='J_price_lowList']/text()").extract()[0]
 
                item["hotelLabel"] = []
                if len(node.css("i::text")) > 0:
                    item["hotelLabel"] = []
                    for text in node.css("i::text").extract():
                        item["hotelLabel"].append(text)
 
                item["hotelFacility"] = []
                if len(node.css(".icon_list>i::attr(title)")) > 0:
                    for text in node.css(".icon_list>i::attr(title)").extract():
                     item["hotelFacility"].append(text)
                
                item['canBook'] = True
                yield item
 
            self.offset += 1
            next_url = self.base_url + str(self.offset)
            yield scrapy.Request(next_url, callback=self.parse)
