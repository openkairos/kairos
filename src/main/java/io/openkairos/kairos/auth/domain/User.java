package io.openkairos.kairos.auth.domain;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.kernel.id.Id;

@AsModel
public final class User {

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
