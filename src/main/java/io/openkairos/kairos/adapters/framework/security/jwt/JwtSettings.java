package io.openkairos.kairos.adapters.framework.security.jwt;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("kairos.security.jwt")
public record JwtSettings(String issuer, Duration accessTokenTtl, Duration refreshTokenTtl, String signingSecret) {}
