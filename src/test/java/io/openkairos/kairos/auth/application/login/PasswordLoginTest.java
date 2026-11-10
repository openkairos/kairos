package io.openkairos.kairos.auth.application.login;

import io.openkairos.kairos.auth.application.login.exception.InvalidCredentialsException;
import io.openkairos.kairos.auth.domain.User;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.net.URI;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

final class PasswordLoginTest {

    @Test
    void an_access_token_is_issued_when_password_credentials_are_valid() {
        var credentialsVerifier = mock(PasswordCredentialsVerifierInterface.class);
        var accessTokenIssuer = mock(AccessTokenIssuerInterface.class);
        var credentials = new PasswordCredentials("jane", "my-secret-password");
        var user = new User(() -> "507f1f77bcf86cd799439011", "jane");
        var accessToken = AccessToken.bearer(
                Duration.ofMinutes(15),
                "access-token",
                "refresh-token"
        );
        when(credentialsVerifier.verify(credentials)).thenReturn(user);
        when(accessTokenIssuer.issue(user)).thenReturn(accessToken);
        var sut = new PasswordLogin(credentialsVerifier, accessTokenIssuer);

        var result = sut.execute(credentials);

        assertTrue(result.isSuccess());
        assertSame(accessToken, result.value());
        verify(credentialsVerifier).verify(credentials);
        verify(accessTokenIssuer).issue(user);
    }

    @Test
    void an_access_token_is_not_issued_when_password_credentials_are_invalid() {
        var credentialsVerifier = mock(PasswordCredentialsVerifierInterface.class);
        var accessTokenIssuer = mock(AccessTokenIssuerInterface.class);
        var credentials = new PasswordCredentials("jane", "my-secret-password");
        when(credentialsVerifier.verify(credentials)).thenThrow(new InvalidCredentialsException());
        var sut = new PasswordLogin(credentialsVerifier, accessTokenIssuer);

        var result = sut.execute(credentials);

        assertTrue(result.isFailure());
        assertEquals(URI.create("urn:openkairos:problem:invalid-credentials"), result.problem().type());
        assertEquals("Invalid credentials", result.problem().title());
        assertEquals(401, result.problem().status());
        assertEquals("The username or password is incorrect.", result.problem().detail());
        verify(credentialsVerifier).verify(credentials);
        verifyNoInteractions(accessTokenIssuer);
    }
}
