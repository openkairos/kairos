package io.openkairos.kairos.bootstrap.superuser.framework;

import io.openkairos.kairos.MongoTest;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Import(SuperUserRepository.class)
final class SuperUserRepositoryTest extends MongoTest {

    @Autowired
    private SuperUserRepository sut;

    @Test
    void it_returns_false_when_no_user_exists() {
        boolean exists = sut.exists();

        assertFalse(exists);
    }

    @Test
    void it_returns_true_when_any_user_exists() {
        mongoTemplate.getCollection("users").insertOne(new Document("username", "existing-user")
                .append("passwordHash", "existing-hash"));

        boolean exists = sut.exists();

        assertTrue(exists);
    }

    @Test
    void it_creates_a_user_with_the_supplied_username_and_password_hash() {
        String username = "kairos";
        String passwordHash = "hashed-password";

        sut.create(username, passwordHash);

        var user = mongoTemplate.getCollection("users")
                .find(new Document("username", username).append("passwordHash", passwordHash))
                .first();
        assertNotNull(user);
    }
}
