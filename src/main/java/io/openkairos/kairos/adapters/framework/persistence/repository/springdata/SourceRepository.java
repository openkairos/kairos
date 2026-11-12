package io.openkairos.kairos.adapters.framework.persistence.repository.springdata;

import io.openkairos.kairos.adapters.framework.persistence.document.SourceDocument;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SourceRepository extends MongoRepository<SourceDocument, ObjectId> {
}
