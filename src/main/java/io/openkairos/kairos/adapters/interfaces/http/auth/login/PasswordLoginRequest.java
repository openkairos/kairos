package io.openkairos.kairos.adapters.interfaces.http.auth.login;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.auth.application.login.PasswordCredentials;
import jakarta.validation.constraints.NotBlank;

@AsModel
public record PasswordLoginRequest(@NotBlank String username, @NotBlank String password) {

    PasswordCredentials toPasswordCredentials() {
        return new PasswordCredentials(username, password);
    }
}
