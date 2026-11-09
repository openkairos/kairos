package io.openkairos.kairos.security.auth;

import io.openkairos.kairos.kernel.annotation.AsModel;

@AsModel
public final class User {

    private final String id;
    private final String username;

    public User(String id, String username) {
        this.id = id;
        this.username = username;
    }

    public String id() {
        return id;
    }

    public String username() {
        return username;
    }
}
