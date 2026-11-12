package io.openkairos.kairos.auth.application.login;

import io.openkairos.kairos.kernel.annotation.AsModel;

@AsModel
public record PasswordCredentials(String username, String password) {}
