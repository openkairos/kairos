package io.openkairos.kairos.bootstrap.superuser;

import io.openkairos.kairos.kernel.logger.LoggerInterface;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;

public final class SetupSuperUser {

    private final LoggerInterface logger;
    private final SuperUserRepositoryInterface superUserRepository;
    private final PasswordHasherInterface passwordHasher;

    public SetupSuperUser(
            LoggerInterface logger,
            SuperUserRepositoryInterface superUserRepository,
            PasswordHasherInterface passwordHasher
    ) {
        this.logger = logger;
        this.superUserRepository = superUserRepository;
        this.passwordHasher = passwordHasher;
    }

    public boolean execute(SetupSuperUserCommand command) {
        if (superUserRepository.exists()) {
            logger.info("Super user already exists; skipping setup.");
            return false;
        }

        superUserRepository.create(command.username(), passwordHasher.hash(command.password()));
        logger.info("Super user created successfully.");
        return true;
    }
}
