package io.openkairos.kairos.bootstrap.superuser.framework;

import io.openkairos.kairos.testing.mongo.MongoTest;
import io.openkairos.kairos.testing.mongo.populator.UserPopulator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Import({SuperUserRepository.class, UserPopulator.class})
final class SuperUserRepositoryTest extends MongoTest {

    @Autowired
    private SuperUserRepository sut;

    @Autowired
    private UserPopulator userPopulator;

    @Test
    void it_returns_false_when_no_user_exists() {
        boolean exists = sut.exists();

        assertFalse(exists);
    }

    @Test
    void it_returns_true_when_any_user_exists() {
        userPopulator.superUser();

        boolean exists = sut.exists();

        assertTrue(exists);
    }

    @Test
    void it_creates_a_user_with_the_supplied_username_and_password_hash() {
        String username = "kairos";
        String password = "hashed-password";

        sut.create(username, password);

        mongoAssertions.assertDocumentExists("users", Map.of(
                "username", username,
                "password", password
        ));
    }
}
