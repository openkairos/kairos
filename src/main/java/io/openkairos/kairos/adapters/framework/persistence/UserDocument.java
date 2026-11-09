package io.openkairos.kairos.adapters.framework.persistence;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record UserDocument(@Id ObjectId id, @Indexed(unique = true) String username, String password) {
}
