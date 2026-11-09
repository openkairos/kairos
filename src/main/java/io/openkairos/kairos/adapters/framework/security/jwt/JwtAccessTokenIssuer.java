package io.openkairos.kairos.adapters.framework.security.jwt;

import io.openkairos.kairos.security.auth.User;
import io.openkairos.kairos.security.auth.login.AccessToken;
import io.openkairos.kairos.security.auth.login.AccessTokenIssuerInterface;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.util.UUID;

@Component
public final class JwtAccessTokenIssuer implements AccessTokenIssuerInterface {

    private final JwtEncoder jwtEncoder;
    private final JwtSettings settings;
    private final Clock clock;

    public JwtAccessTokenIssuer(JwtEncoder jwtEncoder, JwtSettings settings, Clock clock) {
        this.jwtEncoder = jwtEncoder;
        this.settings = settings;
        this.clock = clock;
    }

    @Override
    public AccessToken issue(User user) {
        var issuedAt = clock.instant();
        var expiresAt = issuedAt.plus(settings.accessTokenTtl());
        var claims = JwtClaimsSet.builder()
                .issuer(settings.issuer())
                .subject(user.id())
                .issuedAt(issuedAt)
                .expiresAt(expiresAt)
                .id(UUID.randomUUID().toString())
                .claim("username", user.username())
                .build();
        var value = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return AccessToken.bearer(settings.accessTokenTtl(), value, UUID.randomUUID().toString());
    }
}
