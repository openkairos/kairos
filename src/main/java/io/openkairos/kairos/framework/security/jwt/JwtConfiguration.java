package io.openkairos.kairos.framework.security.jwt;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.time.Clock;

import static java.nio.charset.StandardCharsets.UTF_8;

@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(JwtSettings.class)
public final class JwtConfiguration {

    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }

    @Bean
    JwtEncoder jwtEncoder(JwtSettings settings) {
        return NimbusJwtEncoder.withSecretKey(signingKey(settings))
                .algorithm(MacAlgorithm.HS256)
                .build();
    }

    @Bean
    JwtDecoder jwtDecoder(JwtSettings settings) {
        var decoder = NimbusJwtDecoder.withSecretKey(signingKey(settings))
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
        decoder.setJwtValidator(JwtValidators.createDefaultWithIssuer(settings.issuer()));
        return decoder;
    }

    private SecretKey signingKey(JwtSettings settings) {
        return new SecretKeySpec(settings.signingSecret().getBytes(UTF_8), "HmacSHA256");
    }
}
