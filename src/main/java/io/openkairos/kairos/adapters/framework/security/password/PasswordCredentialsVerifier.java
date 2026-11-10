package io.openkairos.kairos.adapters.framework.security.password;

import io.openkairos.kairos.adapters.framework.persistence.repository.springdata.UserRepository;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import io.openkairos.kairos.auth.application.login.PasswordCredentials;
import io.openkairos.kairos.auth.application.login.PasswordCredentialsVerifierInterface;
import io.openkairos.kairos.auth.application.login.exception.InvalidCredentialsException;
import io.openkairos.kairos.auth.domain.User;
import org.springframework.stereotype.Component;

@Component
public final class PasswordCredentialsVerifier implements PasswordCredentialsVerifierInterface {

    private final UserRepository userRepository;
    private final PasswordHasherInterface passwordHasher;

    public PasswordCredentialsVerifier(UserRepository userRepository, PasswordHasherInterface passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    @Override
    public User verify(PasswordCredentials credentials) throws InvalidCredentialsException {
        var user = userRepository.findByUsername(credentials.username())
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordHasher.verify(user.password(), credentials.password())) {
            throw new InvalidCredentialsException();
        }

        return user.toUser();
    }
}
