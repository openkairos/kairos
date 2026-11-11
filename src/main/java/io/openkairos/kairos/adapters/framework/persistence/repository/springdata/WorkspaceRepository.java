package io.openkairos.kairos.adapters.framework.persistence.repository.springdata;

import io.openkairos.kairos.adapters.framework.persistence.document.WorkspaceDocument;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkspaceRepository extends MongoRepository<WorkspaceDocument, ObjectId> {
}
