package io.openkairos.kairos.adapters.interfaces.http.auth.login;

import io.openkairos.kairos.auth.application.login.AccessToken;

public record PasswordLoginResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long expiresIn
) {

    static PasswordLoginResponse from(AccessToken accessToken) {
        return new PasswordLoginResponse(
                accessToken.value(),
                accessToken.refreshToken(),
                accessToken.type(),
                accessToken.expiresIn().toSeconds()
        );
    }
}
