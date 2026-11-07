package io.openkairos.kairos.bootstrap.superuser.framework;

import io.openkairos.kairos.bootstrap.superuser.SuperUserRepositoryInterface;
import io.openkairos.kairos.kernel.framework.persistence.UserDocument;
import io.openkairos.kairos.kernel.framework.persistence.UserRepository;
import org.springframework.stereotype.Component;

@Component
public final class SuperUserRepository implements SuperUserRepositoryInterface {

    private final UserRepository userRepository;

    public SuperUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean exists() {
        return userRepository.existsAny();
    }

    @Override
    public void create(String username, String passwordHash) {
        userRepository.insert(new UserDocument(null, username, passwordHash));
    }
}
