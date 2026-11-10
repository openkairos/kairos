package io.openkairos.kairos.adapters.framework.persistence.document;

import io.openkairos.kairos.bootstrap.superuser.domain.SuperUser;
import io.openkairos.kairos.adapters.framework.persistence.objectid.BsonObjectId;
import io.openkairos.kairos.auth.domain.User;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public final class UserDocument {

    @Id
    private final ObjectId id;

    @Indexed(unique = true)
    private final String username;

    private final String password;

    private UserDocument(ObjectId id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public static UserDocument from(SuperUser superUser) {
        return new UserDocument(
                new ObjectId(superUser.id().value()),
                superUser.username(),
                superUser.password()
        );
    }

    public User toUser() {
        return new User(new BsonObjectId(id), username);
    }

    public ObjectId id() {
        return id;
    }

    public String username() {
        return username;
    }

    public String password() {
        return password;
    }
}
