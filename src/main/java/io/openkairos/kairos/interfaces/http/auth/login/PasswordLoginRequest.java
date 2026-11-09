package io.openkairos.kairos.interfaces.http.auth.login;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.security.auth.login.PasswordCredentials;

@AsModel
public record PasswordLoginRequest(String username, String password) {

    PasswordCredentials toPasswordCredentials() {
        return new PasswordCredentials(username, password);
    }
}
