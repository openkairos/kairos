package io.openkairos.kairos.bootstrap.superuser.framework;

import io.openkairos.kairos.bootstrap.superuser.SuperUserRepositoryInterface;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

@Component
public final class SuperUserRepository implements SuperUserRepositoryInterface {

    private final MongoTemplate mongoTemplate;

    public SuperUserRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public boolean exists() {
        return mongoTemplate.exists(new Query(), "users");
    }

    @Override
    public void create(String username, String passwordHash) {
        mongoTemplate.insert(new Document("username", username)
                .append("passwordHash", passwordHash), "users");
    }
}
