package io.openkairos.kairos.auth.application.login;

import io.openkairos.kairos.auth.application.login.exception.InvalidCredentialsException;
import io.openkairos.kairos.auth.domain.User;

public interface PasswordCredentialsVerifierInterface {

    User verify(PasswordCredentials credentials) throws InvalidCredentialsException;
}
