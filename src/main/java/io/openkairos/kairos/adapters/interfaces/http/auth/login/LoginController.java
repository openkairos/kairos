package io.openkairos.kairos.adapters.interfaces.http.auth.login;

import io.openkairos.kairos.adapters.interfaces.http.ProblemDetailMapper;
import io.openkairos.kairos.auth.application.login.PasswordLogin;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public final class LoginController {

    private final PasswordLogin passwordLogin;
    private final ProblemDetailMapper problemDetailMapper;

    public LoginController(PasswordLogin passwordLogin, ProblemDetailMapper problemDetailMapper) {
        this.passwordLogin = passwordLogin;
        this.problemDetailMapper = problemDetailMapper;
    }

    @PostMapping(path = "/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> passwordLogin(@Valid @RequestBody PasswordLoginRequest request) {
        return passwordLogin
                .execute(request.toPasswordCredentials())
                .fold(
                        accessToken -> ResponseEntity.ok(PasswordLoginResponse.from(accessToken)),
                        problem -> ResponseEntity.status(problem.status()).body(problemDetailMapper.map(problem)));
    }
}
