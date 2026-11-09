package io.openkairos.kairos.security.auth.login;

public final class PasswordLogin {

    private final PasswordCredentialsVerifierInterface credentialsVerifier;
    private final AccessTokenIssuerInterface accessTokenIssuer;

    public PasswordLogin(
            PasswordCredentialsVerifierInterface credentialsVerifier,
            AccessTokenIssuerInterface accessTokenIssuer
    ) {
        this.credentialsVerifier = credentialsVerifier;
        this.accessTokenIssuer = accessTokenIssuer;
    }

    public AccessToken execute(PasswordCredentials credentials) throws InvalidCredentialsException {
        var user = credentialsVerifier.verify(credentials);

        return accessTokenIssuer.issue(user);
    }
}
