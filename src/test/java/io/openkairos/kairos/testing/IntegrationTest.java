package io.openkairos.kairos.testing;

import io.openkairos.kairos.testing.mongo.assertion.MongoAssertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;
import org.junit.jupiter.api.parallel.ResourceAccessMode;
import org.junit.jupiter.api.parallel.ResourceLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@Import({MongoAssertions.class, TearDown.class})
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
