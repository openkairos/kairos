package io.openkairos.kairos.adapters.interfaces.http.auth.login;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.security.auth.login.AccessToken;

@AsModel
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
