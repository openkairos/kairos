package io.openkairos.kairos.adapters.framework.persistence.repository.adapter;

import io.openkairos.kairos.adapters.framework.persistence.document.UserDocument;
import io.openkairos.kairos.adapters.framework.persistence.repository.springdata.UserRepository;
import io.openkairos.kairos.bootstrap.superuser.domain.SuperUser;
import io.openkairos.kairos.bootstrap.superuser.domain.SuperUserRepositoryInterface;
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
    public void save(SuperUser superUser) {
        userRepository.save(UserDocument.from(superUser));
    }
}
