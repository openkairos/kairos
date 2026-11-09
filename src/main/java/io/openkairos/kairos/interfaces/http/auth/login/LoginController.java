package io.openkairos.kairos.interfaces.http.auth.login;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public final class LoginController {

    @PostMapping(path = "/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    PasswordLoginResponse login(@RequestBody PasswordLoginRequest request) {
        return new PasswordLoginResponse(
                "hard-coded-access-token",
                "hard-coded-refresh-token",
                "Bearer",
                900
        );
    }
}
