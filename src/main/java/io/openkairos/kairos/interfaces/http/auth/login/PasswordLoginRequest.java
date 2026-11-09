package io.openkairos.kairos.interfaces.http.auth.login;

import io.openkairos.kairos.kernel.annotation.AsModel;

@AsModel
public record PasswordLoginRequest(String username, String password) {
}
