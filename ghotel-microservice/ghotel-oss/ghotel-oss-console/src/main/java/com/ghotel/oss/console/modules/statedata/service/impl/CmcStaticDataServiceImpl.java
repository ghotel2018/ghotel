package com.ghotel.oss.console.modules.statedata.service.impl;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.modules.statedata.bean.CmcStaticData;
import com.ghotel.oss.console.modules.statedata.service.CmcStaticDataService;
@GocLogAnnotation(moduleId="StaticData")
@Service(value="cmcStaticDataService")
public class CmcStaticDataServiceImpl extends AbstractPaginationCommonServiceWrapper  implements CmcStaticDataService  {

	@Override
	public void deleteObject(Object o) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List staticDataCachData(String typeCode, String typeKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateObject(CmcStaticData bean) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void expireCodeKey(String typeCode, String typeKey) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void expireAll() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected MongoRepository getRepository() {
		// TODO Auto-generated method stub
		return null;
	}
//	@Resource(name="cmcStaticDataMapper")
//	private CmcStaticDataMapper cmcStaticDataMapper;
//	@Resource(name="cmcStaticDataMapper")
//	public void setMapper(ICommonDao mapper) {
//		this.setAdapter(mapper);
//	}
//	public void deleteObject(Object o) {
//		cmcStaticDataMapper.deleteObject(o);
//	}
//	@Cacheable(value = "indexReptileKeyValue", key = "#indexReptileKey")
//    public String  getReptile(int indexReptileKey) throws Exception {
//		CmcStaticDataSearchCriteria object=new CmcStaticDataSearchCriteria();
//		object.setStart(0);
//		object.setEnd(100);
//		//object.setName("name");
//		object.setTypeCode("CMC_STATIC_DATA_TYPE_CODE");
//		object.setTypeKey("CMC");
//		PaginationResult pr=this.getPaginationAll(object);
//        return pr.toString();
//    }
//	/*@CachePut(value = "indexReptileKeyValue", key = "#indexReptileKey")
//    public List<IndexReptilePJO> setReptile(int indexReptileKey) throws Exception {
//        LOGGER.info("将树节点项目路径  存入guava cache中");
//        return super.handlerindexReptile();
//    }*/
//	/*@Override
//	public Object getStaticData(List<String> typeCodeList,String typeKey) {
//		 Map map=new HashMap();
//		 map.put("codeList", typeCodeList);
//		 map.put("typeKey", typeKey);
//		 return cachData(typeCodeList,map);
//	}*/
//	@SuppressWarnings({ "rawtypes", "unchecked" })
//	@Cacheable(value = "staticDataCachData", key="#typeCode +'_|_'+ #typeKey")
//	public List staticDataCachData(String typeCode,String typeKey){
//		 Map quryMap=new HashMap();
//		 quryMap.put("typeCode", typeCode);
//		 quryMap.put("typeKey", typeKey);
//		
//		return cmcStaticDataMapper.getStaticData(quryMap);
//	}
//	@CacheEvict(value="staticDataCachData", key="#bean.typeCode +'_|_'+ #bean.typeKey")
//	public void updateObject(CmcStaticData bean) {
//		cmcStaticDataMapper.update(bean);
//	}
//	@CacheEvict(value="staticDataCachData",key="#typeCode +'_|_'+ #typeKey")
//	public void expireCodeKey(String typeCode,String typeKey) {
//	}
//	@CacheEvict(value="staticDataCachData",allEntries=true)
//	public void expireAll() {
//	}
	
	
	

}
