package io.openkairos.kairos.adapters.framework.persistence.objectid;

import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.kernel.id.IdGeneratorInterface;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Component
public final class ObjectIdGenerator implements IdGeneratorInterface {

    @Override
    public Id generate() {
        return new BsonObjectId(new ObjectId());
    }
}
