package io.openkairos.kairos.adapters.framework.persistence.document;

import io.openkairos.kairos.adapters.framework.persistence.objectid.BsonObjectId;
import io.openkairos.kairos.source.domain.Source;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("sources")
public final class SourceDocument {

    @Id
    private final ObjectId id;

    private final ObjectId workspaceId;

    private final String name;

    private final String description;

    private final String appIdentifier;

    private final String writeKey;

    private SourceDocument(
            ObjectId id, ObjectId workspaceId, String name, String description, String appIdentifier, String writeKey) {
        this.id = id;
        this.workspaceId = workspaceId;
        this.name = name;
        this.description = description;
        this.appIdentifier = appIdentifier;
        this.writeKey = writeKey;
    }

    public static SourceDocument from(Source source) {
        return new SourceDocument(
                new ObjectId(source.id().value()),
                new ObjectId(source.workspaceId().value()),
                source.name(),
                source.description(),
                source.appIdentifier(),
                source.writeKey());
    }

    public Source toSource() {
        return new Source(
                new BsonObjectId(id), new BsonObjectId(workspaceId), name, description, appIdentifier, writeKey);
    }

    public ObjectId id() {
        return id;
    }

    public ObjectId workspaceId() {
        return workspaceId;
    }

    public String name() {
        return name;
    }

    public String description() {
        return description;
    }

    public String appIdentifier() {
        return appIdentifier;
    }

    public String writeKey() {
        return writeKey;
    }
}
