# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class XiechengItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    hotelName = scrapy.Field()
    hotelId = scrapy.Field()
    hotelLat = scrapy.Field()
    hotelLon = scrapy.Field()
    hotelImg = scrapy.Field()
    hotelAddress = scrapy.Field()
    hotelPoint = scrapy.Field()
    hotelJudgement = scrapy.Field()
    hotelPrice = scrapy.Field()
    hotelLabel = scrapy.Field()
    hotelFacility = scrapy.Field()
    hotelZone = scrapy.Field()
    hotelDistrict = scrapy.Field()
    canBook = scrapy.Field()
    
