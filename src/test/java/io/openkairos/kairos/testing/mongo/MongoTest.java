package io.openkairos.kairos.testing.mongo;

import io.openkairos.kairos.testing.mongo.assertion.MongoAssertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;
import org.junit.jupiter.api.parallel.ResourceAccessMode;
import org.junit.jupiter.api.parallel.ResourceLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;

@DataMongoTest
@Import({MongoTestConfiguration.class, MongoAssertions.class})
@Execution(ExecutionMode.SAME_THREAD)
@ResourceLock(value = "mongo-tests", mode = ResourceAccessMode.READ_WRITE)
public abstract class MongoTest {

    @Autowired
    protected MongoTemplate mongoTemplate;

    @Autowired
    protected MongoAssertions mongoAssertions;

    @AfterEach
    void drop_collections() {
        for (String collection : mongoTemplate.getCollectionNames()) {
            mongoTemplate.dropCollection(collection);
        }
    }
}
