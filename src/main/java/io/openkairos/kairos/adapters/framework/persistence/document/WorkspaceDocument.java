package io.openkairos.kairos.adapters.framework.persistence.document;

import io.openkairos.kairos.adapters.framework.persistence.objectid.BsonObjectId;
import io.openkairos.kairos.workspace.domain.Workspace;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("workspaces")
public final class WorkspaceDocument {

    @Id
    private final ObjectId id;

    private final String name;

    @Indexed(unique = true)
    private final String slug;

    private final List<String> environments;

    private WorkspaceDocument(ObjectId id, String name, String slug, List<String> environments) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.environments = List.copyOf(environments);
    }

    public static WorkspaceDocument from(Workspace workspace) {
        return new WorkspaceDocument(
                new ObjectId(workspace.id().value()), workspace.name(), workspace.slug(), workspace.environments());
    }

    public Workspace toWorkspace() {
        return new Workspace(new BsonObjectId(id), name, slug, environments);
    }

    public ObjectId id() {
        return id;
    }

    public String name() {
        return name;
    }

    public String slug() {
        return slug;
    }

    public List<String> environments() {
        return environments;
    }
}
