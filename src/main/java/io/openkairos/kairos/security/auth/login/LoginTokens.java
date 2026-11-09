package io.openkairos.kairos.security.auth.login;

import io.openkairos.kairos.kernel.annotation.AsModel;

import java.time.Duration;

@AsModel
public record LoginTokens(String accessToken, String refreshToken, Duration accessTokenLifetime) {
}
