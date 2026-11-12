package io.openkairos.kairos.testing.mongo.assertion;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Map;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;

public final class MongoAssertions {

    private final MongoTemplate mongoTemplate;

    public MongoAssertions(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void assertDocumentExists(String collectionName, Map<String, ?> criteria) {
        var document = mongoTemplate
                .getCollection(collectionName)
                .find(new Document(criteria))
                .first();

        assertNotNull(
                document,
                () -> "Expected a document in collection '%s' matching %s".formatted(collectionName, criteria));
    }
}
