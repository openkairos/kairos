package io.openkairos.kairos.testing.mongo.populator;

import io.openkairos.kairos.adapters.framework.persistence.document.WorkspaceDocument;
import io.openkairos.kairos.workspace.domain.Workspace;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public final class WorkspacePopulator {

    private final MongoTemplate mongoTemplate;

    public WorkspacePopulator(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Workspace workspace() {
        String id = new ObjectId().toHexString();
        var workspace = new Workspace(
                () -> id,
                "Acme",
                "acme",
                List.of("default")
        );
        mongoTemplate.insert(WorkspaceDocument.from(workspace));

        return workspace;
    }
}
