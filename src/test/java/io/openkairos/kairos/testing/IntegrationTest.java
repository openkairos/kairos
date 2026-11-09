package io.openkairos.kairos.testing;

import io.openkairos.kairos.adapters.framework.security.password.Argon2PasswordHasher;
import io.openkairos.kairos.testing.mongo.assertion.MongoAssertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;
import org.junit.jupiter.api.parallel.ResourceAccessMode;
import org.junit.jupiter.api.parallel.ResourceLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;

@DataMongoTest
@Import({IntegrationTestConfiguration.class, MongoAssertions.class, Argon2PasswordHasher.class, TearDown.class})
@Execution(ExecutionMode.SAME_THREAD)
@ResourceLock(value = "mongo-tests", mode = ResourceAccessMode.READ_WRITE)
public abstract class IntegrationTest {

    @Autowired
    protected MongoAssertions mongoAssertions;

    @Autowired
    private TearDown tearDown;

    @AfterEach
    void tearDown() {
        tearDown.clearMongoCollections();
    }
}
