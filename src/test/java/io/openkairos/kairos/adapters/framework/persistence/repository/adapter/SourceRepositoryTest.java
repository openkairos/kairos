package io.openkairos.kairos.adapters.framework.persistence.repository.adapter;

import io.openkairos.kairos.source.domain.Source;
import io.openkairos.kairos.testing.IntegrationTest;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import java.util.Map;

@Import(SourceRepository.class)
final class SourceRepositoryTest extends IntegrationTest {

    @Autowired
    private SourceRepository sut;

    @Test
    void it_saves_a_source() {
        var source = new Source(
                () -> "507f1f77bcf86cd799439011",
                () -> "507f1f77bcf86cd799439012",
                "Acme iOS",
                "iOS app",
                "com.acme.ios",
                "hashed-write-key"
        );

        sut.save(source);

        mongoAssertions.assertDocumentExists("sources", Map.of(
                "_id", new ObjectId(source.id().value()),
                "workspaceId", new ObjectId(source.workspaceId().value()),
                "name", "Acme iOS",
                "description", "iOS app",
                "appIdentifier", "com.acme.ios",
                "writeKey", "hashed-write-key"
        ));
    }
}
