package io.openkairos.kairos.bootstrap.superuser.domain;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.kernel.security.Authenticatable;
import java.util.Objects;

@AsModel
public record SuperUser(Id id, String username, String password) implements Authenticatable {

    public SuperUser {
        Objects.requireNonNull(id);
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
    }
}
