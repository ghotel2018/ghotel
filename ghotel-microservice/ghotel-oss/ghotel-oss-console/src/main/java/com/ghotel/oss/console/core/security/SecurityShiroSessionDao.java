package com.ghotel.oss.console.core.security;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.AbstractSessionDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.ghotel.oss.console.core.utils.Base64;
import com.ghotel.oss.console.core.utils.SerializeUtils;

import redis.clients.jedis.JedisCluster;

/**
 * Seq Date Who Remark 1 06/07/2017 iBuilder 负载均衡共享session
 * 
 */

public class SecurityShiroSessionDao extends AbstractSessionDAO {

	// seq 1
	private static Logger log = LoggerFactory.getLogger(SecurityShiroSessionDao.class);
	@Autowired
	@Qualifier(value = "jedisCluster")
	private JedisCluster jedisCluster;

	private static String sessionMapKey = "CMC-SESSION-MAP-KEY";
	private static String sessionKey = "CMC-SESSION-KEY";

	public void update(Session session) {
		try {
			byte[] btID = session.getId().toString().getBytes("UTF-8");
			byte[] btSession = SerializeUtils.serialize(session); // 序列化session对象
			jedisCluster.set(btID, btSession);
			jedisCluster.expire(btID, 30 * 60);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}

	public void delete(Session session) {
		try {
			byte[] btID = session.getId().toString().getBytes("UTF-8");
			if (jedisCluster.exists(btID)) {
				jedisCluster.del(btID);
				// 更新Session映射表
				String id = new String(Base64.encode(btID));
				if (jedisCluster.exists(sessionMapKey)) {
					Map<String, String> map = new HashMap<String, String>();
					map = jedisCluster.hgetAll(sessionMapKey);
					Set<Map.Entry<String, String>> entrySet = map.entrySet();
					Iterator<Map.Entry<String, String>> it = entrySet.iterator();
					while (it.hasNext()) {
						Map.Entry<String, String> entry = it.next();
						String key = entry.getKey();
						String value = entry.getValue();
						if (id.equals(value)) { // 与映射表对比加密后ID
							map.remove(key);
							jedisCluster.del(sessionMapKey);
							jedisCluster.hmset(sessionMapKey, map);
							break;
						}
					}
				}
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}

	public Collection<Session> getActiveSessions() {
		Set<Session> set = new HashSet<Session>();
		try {
			if (jedisCluster.exists(sessionMapKey)) {
				Map<String, String> map = new HashMap<String, String>();
				map = jedisCluster.hgetAll(sessionMapKey);
				Set<Map.Entry<String, String>> entrySet = map.entrySet();
				Iterator<Map.Entry<String, String>> it = entrySet.iterator();
				while (it.hasNext()) {
					Map.Entry<String, String> entry = it.next();
					String value = entry.getValue();
					byte[] btID = Base64.decode(value.getBytes("UTF-8")); // 解密后ID
					byte[] btSession = jedisCluster.get(btID);
					if (btSession != null) {
						Session session = (Session) SerializeUtils.deSerialize(btSession); // 反序列化session对象
						set.add(session);
					}

				}
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return set;
	}

	protected Serializable doCreate(Session session) {
		Serializable sessionId = generateSessionId(session);
		assignSessionId(session, sessionId);
		try {
			byte[] btID = sessionId.toString().getBytes("UTF-8"); // 原始ID字节流
			byte[] btSession = SerializeUtils.serialize(session); // 序列化session对象
			jedisCluster.set(btID, btSession);
			jedisCluster.expire(btID, 30 * 60);

			// 更新Session映射表
			String id = new String(Base64.encode(btID)); // 加密后ID
			Map<String, String> map = new HashMap<String, String>();
			if (jedisCluster.exists(sessionMapKey)) {
				map = jedisCluster.hgetAll(sessionMapKey);
				boolean isExsit = false;
				Set<Map.Entry<String, String>> entrySet = map.entrySet();
				Iterator<Map.Entry<String, String>> it = entrySet.iterator();
				while (it.hasNext()) {
					Map.Entry<String, String> entry = it.next();
					String value = entry.getValue();
					if (id.equals(value)) { // 与映射表对比加密后ID
						isExsit = true;
					}
				}
				if (!isExsit) { // 防止多次执行，产生数据冗余
					int size = map.size() + 1;
					if (size > 100) {
						map.clear();
						size = 1;
						jedisCluster.del(sessionMapKey);
					}
					map.put(sessionKey + size, id);
					jedisCluster.hmset(sessionMapKey, map);
				}
			} else {
				map.put(sessionKey + "1", id);
				jedisCluster.hmset(sessionMapKey, map);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}

		return sessionId;
	}

	protected Session doReadSession(Serializable sessionId) {
		Session session = null;
		try {
			byte[] btID = sessionId.toString().getBytes("UTF-8");
			if (jedisCluster.exists(btID)) {
				byte[] btSession = jedisCluster.get(btID);
				session = (Session) SerializeUtils.deSerialize(btSession); // 反序列化session对象
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return session;
	}

}