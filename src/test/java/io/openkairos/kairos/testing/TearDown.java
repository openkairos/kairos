package io.openkairos.kairos.testing;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;

public final class TearDown {

    private final MongoTemplate mongoTemplate;

    public TearDown(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void clearMongoCollections() {
        for (String collection : mongoTemplate.getCollectionNames()) {
            mongoTemplate.getCollection(collection).deleteMany(new Document());
        }
    }
}
