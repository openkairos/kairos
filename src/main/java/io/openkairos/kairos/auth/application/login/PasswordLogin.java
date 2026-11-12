package io.openkairos.kairos.auth.application.login;

import io.openkairos.kairos.auth.application.login.exception.InvalidCredentialsException;
import io.openkairos.kairos.kernel.result.Problem;
import io.openkairos.kairos.kernel.result.Result;
import java.net.URI;
import java.util.Map;

public final class PasswordLogin {

    private static final URI INVALID_CREDENTIALS_TYPE = URI.create("urn:openkairos:problem:invalid-credentials");
    private static final int UNAUTHORIZED_STATUS = 401;

    private final PasswordCredentialsVerifierInterface credentialsVerifier;
    private final AccessTokenIssuerInterface accessTokenIssuer;

    public PasswordLogin(
            PasswordCredentialsVerifierInterface credentialsVerifier, AccessTokenIssuerInterface accessTokenIssuer) {
        this.credentialsVerifier = credentialsVerifier;
        this.accessTokenIssuer = accessTokenIssuer;
    }

    public Result<AccessToken> execute(PasswordCredentials credentials) {
        try {
            var user = credentialsVerifier.verify(credentials);

            return Result.success(accessTokenIssuer.issue(user));
        } catch (InvalidCredentialsException exception) {
            return Result.failure(invalidCredentials());
        }
    }

    private Problem invalidCredentials() {
        return new Problem(
                INVALID_CREDENTIALS_TYPE,
                "Invalid credentials",
                UNAUTHORIZED_STATUS,
                "The username or password is incorrect.",
                Map.of());
    }
}
