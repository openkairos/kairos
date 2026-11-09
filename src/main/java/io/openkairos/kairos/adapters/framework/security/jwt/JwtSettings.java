package io.openkairos.kairos.adapters.framework.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@ConfigurationProperties("kairos.security.jwt")
public record JwtSettings(
        String issuer,
        Duration accessTokenTtl,
        Duration refreshTokenTtl,
        String signingSecret
) {
}
