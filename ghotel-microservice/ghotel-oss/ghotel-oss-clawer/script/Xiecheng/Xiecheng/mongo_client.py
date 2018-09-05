# -*- coding: utf-8 -*-
import sys
import traceback    

import pymongo


MONGODB_CONFIG = {
    'host': '127.0.0.1',
#     'host': '10.108.67.87',
#     'host': '192.168.1.107',
    'port': 27017,
    'db_name': 'hotel',
    'username': None,
    'password': None
}


class MongoConn(object):

    def __init__(self):
        # connect db
        try:
            self.conn = pymongo.MongoClient(MONGODB_CONFIG['host'], MONGODB_CONFIG['port'])
            self.db = self.conn[MONGODB_CONFIG['db_name']]  # connect db
            self.username = MONGODB_CONFIG['username']
            self.password = MONGODB_CONFIG['password']           
            if self.username and self.password:
                self.connected = self.db.authenticate(self.username, self.password)
            else:
                self.connected = True
        except Exception:
#             print traceback.format_exc()
#             print 'Connect Statics Database Fail.'
            sys.exit(1)   
