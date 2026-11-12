package io.openkairos.kairos.testing.mongo.populator;

import io.openkairos.kairos.adapters.framework.persistence.document.UserDocument;
import io.openkairos.kairos.bootstrap.superuser.domain.SuperUser;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public final class UserPopulator {

    private final MongoTemplate mongoTemplate;
    private final PasswordHasherInterface passwordHasher;

    public UserPopulator(MongoTemplate mongoTemplate, PasswordHasherInterface passwordHasher) {
        this.mongoTemplate = mongoTemplate;
        this.passwordHasher = passwordHasher;
    }

    public SuperUser superUser() {
        return superUser("super-user", "password");
    }

    public SuperUser superUser(String username, String plainPassword) {
        var superUser = new SuperUser(() -> new ObjectId().toHexString(), username, passwordHasher.hash(plainPassword));
        mongoTemplate.insert(UserDocument.from(superUser));
        return superUser;
    }
}
