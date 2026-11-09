package io.openkairos.kairos.security.auth.login;

import io.openkairos.kairos.security.auth.User;

public interface PasswordCredentialsVerifierInterface {

    User verify(PasswordCredentials credentials) throws InvalidCredentialsException;
}
