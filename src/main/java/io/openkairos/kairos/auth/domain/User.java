package io.openkairos.kairos.auth.domain;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.kernel.security.Authenticatable;

@AsModel
public final class User implements Authenticatable {

    private final Id id;
    private final String username;

    public User(Id id, String username) {
        this.id = id;
        this.username = username;
    }

    public Id id() {
        return id;
    }

    public String username() {
        return username;
    }
}
