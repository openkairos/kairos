package io.openkairos.kairos.adapters.framework.persistence.objectid;

import io.openkairos.kairos.kernel.id.Id;
import java.util.Objects;
import org.bson.types.ObjectId;

public record BsonObjectId(ObjectId objectId) implements Id {

    public BsonObjectId {
        Objects.requireNonNull(objectId);
    }

    @Override
    public String value() {
        return objectId.toHexString();
    }
}
