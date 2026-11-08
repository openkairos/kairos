package io.openkairos.kairos.testing.mongo.populator;

import io.openkairos.kairos.kernel.framework.persistence.UserDocument;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import org.springframework.data.mongodb.core.MongoTemplate;

public final class UserPopulator {

    private final MongoTemplate mongoTemplate;
    private final PasswordHasherInterface passwordHasher;

    public UserPopulator(MongoTemplate mongoTemplate, PasswordHasherInterface passwordHasher) {
        this.mongoTemplate = mongoTemplate;
        this.passwordHasher = passwordHasher;
    }

    public void superUser() {
        superUser("super-user", "password");
    }

    public void superUser(String username, String plainPassword) {
        mongoTemplate.insert(new UserDocument(null, username, passwordHasher.hash(plainPassword)));
    }
}
