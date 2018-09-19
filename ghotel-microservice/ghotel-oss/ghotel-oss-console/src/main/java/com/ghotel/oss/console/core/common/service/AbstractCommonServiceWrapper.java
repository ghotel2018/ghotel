package com.ghotel.oss.console.core.common.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.model.po.BasePO;
import com.ghotel.model.po.CommonMeta;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;

public abstract class AbstractCommonServiceWrapper<T> implements ICommonService<T> {

	protected abstract MongoRepository<T, String> getRepository();

	@Override
	@GocLogAnnotation(description = "新增")
	public T add(T t) throws Exception {
		return getRepository().save(t);
	}

	@Override
	@SuppressWarnings("unchecked")
	@GocLogAnnotation(description = "更新")
	public T update(T t) throws Exception {
		if (t instanceof BasePO) {
			BasePO po = (BasePO) t;
			BasePO orginPo = (BasePO) getRepository().findById(po.getId()).get();

			CommonMeta commonMeta = orginPo.getCommonMeta();
			commonMeta.setLastUpdateTime(new Date());
			po.setCommonMeta(commonMeta);

			return getRepository().save((T) po);
		} else {
			return getRepository().save(t);
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	@GocLogAnnotation(description = "删除")
	public int delete(T t) throws Exception {
		int count = (int) getRepository().count(Example.of(t));

		if (t instanceof BasePO) {
			BasePO po = (BasePO) t;
			CommonMeta commonMeta = po.getCommonMeta();
			commonMeta.setDelFlag(true);
			po.setCommonMeta(commonMeta);
			getRepository().save((T) po);
		} else {
			getRepository().delete(t);
		}
		return count;
	}

	@Override
	@GocLogAnnotation(description = "删除")
	public int delete(String id) throws Exception {
		return delete(getRepository().findById(id).get());
	}

	@Override
	public T get(String id) throws Exception {
		return getRepository().findById(id).get();
	}

	@Override
	public List<T> getAll() {

		return getRepository().findAll();
	}

}
