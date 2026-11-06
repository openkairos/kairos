package io.openkairos.kairos.bootstrap.superuser;

import io.openkairos.kairos.kernel.NotService;

import java.security.SecureRandom;
import java.util.Base64;

@NotService
public final class SetupSuperUserCommand {
    private final String username;
    private final String password;
    private final boolean passwordGenerated;

    private SetupSuperUserCommand(String username, String password, boolean passwordGenerated) {
        this.username = username;
        this.password = password;
        this.passwordGenerated = passwordGenerated;
    }

    public static SetupSuperUserCommand of(String username, String password) {
        if (password != null && !password.isEmpty()) {
            return new SetupSuperUserCommand(username, password, false);
        }

        byte[] bytes = new byte[32];
        new SecureRandom().nextBytes(bytes);
        String generatedPassword = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);

        return new SetupSuperUserCommand(username, generatedPassword, true);
    }

    public String username() {
        return username;
    }

    public String password() {
        return password;
    }

    public boolean passwordGenerated() {
        return passwordGenerated;
    }
}
