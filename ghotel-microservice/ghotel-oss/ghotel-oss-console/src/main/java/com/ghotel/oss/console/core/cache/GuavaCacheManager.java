package com.ghotel.oss.console.core.cache;


import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;

import org.springframework.cache.Cache;
import org.springframework.cache.support.AbstractCacheManager;

import com.google.common.cache.CacheBuilder;
import com.google.common.collect.Maps;

/**
 * guavacache支持事务回滚，重写manager。
 * cache的构建使用builder配置构建
 */
public class GuavaCacheManager  extends AbstractCacheManager {

    private final ConcurrentMap<String, Cache> cacheMap = Maps.newConcurrentMap();

    private boolean dynamic = true;

    private Map<String, CacheBuilder> builderMap = Maps.newHashMap();

    private boolean allowNullValues = true;

    @Override
    protected Collection<? extends Cache> loadCaches() {
        Collection<Cache> values = cacheMap.values();
        return values;
    }

    @Override
    public Cache getCache(String name) {
        Cache cache = this.cacheMap.get(name);
        if (cache == null && this.dynamic) {
            synchronized (this.cacheMap) {
                cache = this.cacheMap.get(name);
                if (cache == null && this.builderMap.containsKey(name)) {
                    CacheBuilder builder = this.builderMap.get(name);
                    cache = createGuavaCache(name, builder);
                    this.cacheMap.put(name, cache);
                }
            }
        }
        return cache;
    }

    protected Cache createGuavaCache(String name, CacheBuilder builder) {
        com.google.common.cache.Cache<Object, Object> cache = null;
        if(builder == null){
            cache = CacheBuilder.newBuilder().build();
        }else{
            cache = builder.build();
        }
        return new GuavaCache(name, cache, isAllowNullValues());
    }


    public boolean isAllowNullValues() {
        return this.allowNullValues;
    }

    public void setConfigMap(Map<String, CacheBuilder> configMap) {
        this.builderMap = configMap;
    }

}
