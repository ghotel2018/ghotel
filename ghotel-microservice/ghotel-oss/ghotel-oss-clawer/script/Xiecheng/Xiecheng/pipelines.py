# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import json
from mongo_client import MongoConn

conn = MongoConn()


class XiechengPipeline(object):
    
#     def __init__(self):
# #         self.file = open("hotel_info.json", "w")
# #         self.file.write("[")

    def process_item(self, item, spider):
#         content = json.dumps(dict(item), ensure_ascii=False) + ",\n"
#         self.file.write(content)
        conn.db['hotel'].replace_one({'hotelId':item['hotelId']}, item, True)
        return item

#     def close_spider(self, spider):
#         self.file.write("{}]")
#         self.file.close()
