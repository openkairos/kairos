package io.openkairos.kairos.auth.application.login;

import io.openkairos.kairos.kernel.annotation.AsModel;
import java.time.Duration;

@AsModel
public final class AccessToken {

    private final String type;
    private final Duration expiresIn;
    private final String value;
    private final String refreshToken;

    private AccessToken(String type, Duration expiresIn, String value, String refreshToken) {
        this.type = type;
        this.expiresIn = expiresIn;
        this.value = value;
        this.refreshToken = refreshToken;
    }

    public static AccessToken bearer(Duration expiresIn, String value, String refreshToken) {
        return new AccessToken("Bearer", expiresIn, value, refreshToken);
    }

    public String type() {
        return type;
    }

    public Duration expiresIn() {
        return expiresIn;
    }

    public String value() {
        return value;
    }

    public String refreshToken() {
        return refreshToken;
    }
}
