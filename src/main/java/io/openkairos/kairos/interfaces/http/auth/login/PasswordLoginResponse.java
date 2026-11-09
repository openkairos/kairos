package io.openkairos.kairos.interfaces.http.auth.login;

import io.openkairos.kairos.kernel.annotation.AsModel;

@AsModel
public record PasswordLoginResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long expiresIn
) {
}
