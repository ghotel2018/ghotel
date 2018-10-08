package com.ghotel.core.listener;

import java.lang.reflect.Field;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.annotation.Id;
import org.springframework.data.mapping.MappingException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.MongoPersistentEntity;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.util.ReflectionUtils;

import com.ghotel.model.annotation.CascadeSave;

public class CascadingMongoEventListener extends AbstractMongoEventListener<Object> {

//	private MongoOperations mongoOperations;
//
//	public CascadingMongoEventListener(MongoOperations mongoOperations) {
//		super();
//		this.mongoOperations = mongoOperations;
//	}
	@Autowired
	private ApplicationContext appContext;

	public MongoOperations getMongoOperations(String collectionName) {
		Iterator<MongoOperations> mongoOperationsIterator = appContext.getBeansOfType(MongoOperations.class).values()
				.iterator();
		while (mongoOperationsIterator.hasNext()) {
			MongoOperations mongoOperations = mongoOperationsIterator.next();
			Iterator<? extends MongoPersistentEntity<?>> persistentEntitiesIterator = mongoOperations.getConverter()
					.getMappingContext().getPersistentEntities().iterator();

			while (persistentEntitiesIterator.hasNext()) {
				MongoPersistentEntity<?> entity = persistentEntitiesIterator.next();
				if (entity.getCollection().equals(collectionName)) {
					return mongoOperations;
				}
			}
		}
		return null;
	}

//	public void setMongoOperations(MongoOperations mongoOperations) {
//		this.mongoOperations = mongoOperations;
//	}

	@Override
	public void onBeforeConvert(BeforeConvertEvent<Object> event) {
		final Object source = event.getSource();
		ReflectionUtils.doWithFields(source.getClass(), new ReflectionUtils.FieldCallback() {

			public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException {
				ReflectionUtils.makeAccessible(field);

				if (field.isAnnotationPresent(DBRef.class) && field.isAnnotationPresent(CascadeSave.class)) {
					final Object fieldValue = field.get(source);

					if (fieldValue != null) {
						DbRefFieldCallback callback = new DbRefFieldCallback();

						ReflectionUtils.doWithFields(fieldValue.getClass(), callback);

						if (!callback.isIdFound()) {
							throw new MappingException("Cannot perform cascade save on child object without id set");
						}

						MongoOperations mongoOperations = getMongoOperations(event.getCollectionName());
						if (mongoOperations != null) {
							mongoOperations.save(fieldValue);
						} else {
							throw new MappingException(
									"Cannot perform cascade save on child object without suited mongoOperations");
						}
					}
				}
			}
		});
	}

	private static class DbRefFieldCallback implements ReflectionUtils.FieldCallback {
		private boolean idFound;

		public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException {
			ReflectionUtils.makeAccessible(field);

			if (field.isAnnotationPresent(Id.class)) {
				idFound = true;
			}
		}

		public boolean isIdFound() {
			return idFound;
		}
	}
}