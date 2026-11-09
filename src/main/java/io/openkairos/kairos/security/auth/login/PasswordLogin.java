package io.openkairos.kairos.security.auth.login;

import java.time.Duration;

public final class PasswordLogin {

    public AccessToken execute(PasswordCredentials credentials) {
        return AccessToken.bearer(
                Duration.ofSeconds(900),
                "hard-coded-access-token",
                "hard-coded-refresh-token"
        );
    }
}
