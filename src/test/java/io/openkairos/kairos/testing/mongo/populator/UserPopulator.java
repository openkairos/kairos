package io.openkairos.kairos.testing.mongo.populator;

import io.openkairos.kairos.kernel.framework.persistence.UserDocument;
import org.springframework.data.mongodb.core.MongoTemplate;

public final class UserPopulator {

    private final MongoTemplate mongoTemplate;

    public UserPopulator(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void superUser() {
        mongoTemplate.insert(new UserDocument(null, "super-user", "hashed-password"));
    }
}
