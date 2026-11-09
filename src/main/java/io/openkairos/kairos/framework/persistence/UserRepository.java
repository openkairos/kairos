package io.openkairos.kairos.framework.persistence;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<UserDocument, ObjectId> {

    @Query(value = "{}", exists = true)
    boolean existsAny();
}
