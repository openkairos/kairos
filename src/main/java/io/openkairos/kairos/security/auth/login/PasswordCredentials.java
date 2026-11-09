package io.openkairos.kairos.security.auth.login;

import io.openkairos.kairos.kernel.annotation.AsModel;

@AsModel
public record PasswordCredentials(String username, String password) {
}
