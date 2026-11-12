package io.openkairos.kairos.adapters.framework.persistence.repository.adapter;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.openkairos.kairos.adapters.framework.persistence.document.UserDocument;
import io.openkairos.kairos.adapters.framework.persistence.repository.springdata.UserRepository;
import io.openkairos.kairos.adapters.framework.security.password.Argon2PasswordHasher;
import io.openkairos.kairos.bootstrap.superuser.domain.SuperUser;
import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.testing.IntegrationTest;
import io.openkairos.kairos.testing.mongo.populator.UserPopulator;
import java.util.Map;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;

@DataMongoTest
@Import({Argon2PasswordHasher.class, SuperUserRepository.class, UserPopulator.class})
final class SuperUserRepositoryTest extends IntegrationTest {

    @Autowired
    private SuperUserRepository sut;

    @Autowired
    private UserPopulator userPopulator;

    @Autowired
    private UserRepository userRepository;

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
    void it_saves_a_super_user() {
        Id id = () -> "507f1f77bcf86cd799439011";
        String username = "kairos";
        String password = "hashed-password";
        var superUser = new SuperUser(id, username, password);

        sut.save(superUser);

        mongoAssertions.assertDocumentExists(
                "users",
                Map.of(
                        "_id", new ObjectId(id.value()),
                        "username", username,
                        "password", password));
    }

    @Test
    void it_updates_an_existing_super_user() {
        Id id = () -> "507f1f77bcf86cd799439011";
        userRepository.save(UserDocument.from(new SuperUser(id, "kairos", "old-hashed-password")));
        var superUser = new SuperUser(id, "kairos", "hashed-password");

        sut.save(superUser);

        mongoAssertions.assertDocumentExists(
                "users",
                Map.of(
                        "_id", new ObjectId(id.value()),
                        "username", "kairos",
                        "password", "hashed-password"));
    }
}
