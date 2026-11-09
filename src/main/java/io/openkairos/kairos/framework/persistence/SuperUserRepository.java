package io.openkairos.kairos.framework.persistence;

import io.openkairos.kairos.bootstrap.superuser.SuperUserRepositoryInterface;
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
