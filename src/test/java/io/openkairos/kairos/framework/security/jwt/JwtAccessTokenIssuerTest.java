package io.openkairos.kairos.framework.security.jwt;

import io.openkairos.kairos.security.auth.User;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

final class JwtAccessTokenIssuerTest {

    @Test
    void an_issued_access_token_identifies_the_authenticated_user() {
        var issuedAt = Instant.now().truncatedTo(ChronoUnit.SECONDS);
        var settings = settings();
        var configuration = new JwtConfiguration();
        var encoder = configuration.jwtEncoder(settings);
        var decoder = configuration.jwtDecoder(settings);
        var user = new User("507f1f77bcf86cd799439011", "jane");
        var sut = new JwtAccessTokenIssuer(encoder, settings, Clock.fixed(issuedAt, ZoneOffset.UTC));

        var accessToken = sut.issue(user);
        var jwt = decoder.decode(accessToken.value());

        assertEquals(settings.issuer(), jwt.getIssuer().toString());
        assertEquals(user.id(), jwt.getSubject());
        assertEquals(user.username(), jwt.getClaimAsString("username"));
        assertEquals(issuedAt, jwt.getIssuedAt());
        assertFalse(jwt.getId().isBlank());
    }

    @Test
    void an_issued_access_token_expires_after_the_configured_lifetime() {
        var issuedAt = Instant.now().truncatedTo(ChronoUnit.SECONDS);
        var settings = settings();
        var configuration = new JwtConfiguration();
        var encoder = configuration.jwtEncoder(settings);
        var decoder = configuration.jwtDecoder(settings);
        var user = new User("507f1f77bcf86cd799439011", "jane");
        var sut = new JwtAccessTokenIssuer(encoder, settings, Clock.fixed(issuedAt, ZoneOffset.UTC));

        var accessToken = sut.issue(user);
        var jwt = decoder.decode(accessToken.value());

        assertEquals(settings.accessTokenTtl(), accessToken.expiresIn());
        assertEquals(issuedAt.plus(settings.accessTokenTtl()), jwt.getExpiresAt());
    }

    private JwtSettings settings() {
        return new JwtSettings(
                "https://kairos.test",
                Duration.ofMinutes(15),
                Duration.ofDays(30),
                "test-signing-secret-that-is-long-enough-for-hmac"
        );
    }
}
