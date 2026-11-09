package io.openkairos.kairos.interfaces.http.auth.login;

import io.openkairos.kairos.security.auth.login.PasswordLogin;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public final class LoginController {

    private final PasswordLogin passwordLogin;

    public LoginController(PasswordLogin passwordLogin) {
        this.passwordLogin = passwordLogin;
    }

    @PostMapping(path = "/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    PasswordLoginResponse passwordLogin(@RequestBody PasswordLoginRequest request) {
        return PasswordLoginResponse.from(
                passwordLogin.execute(request.toPasswordCredentials())
        );
    }
}
