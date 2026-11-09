package io.openkairos.kairos.adapters.framework.persistence;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserDocument, ObjectId> {

    @Query(value = "{}", exists = true)
    boolean existsAny();

    Optional<UserDocument> findByUsername(String username);
}
