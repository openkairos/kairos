package io.openkairos.kairos.bootstrap.superuser.application;

import io.openkairos.kairos.bootstrap.superuser.domain.SuperUser;
import io.openkairos.kairos.bootstrap.superuser.domain.SuperUserRepositoryInterface;
import io.openkairos.kairos.kernel.id.IdGeneratorInterface;
import io.openkairos.kairos.kernel.logger.LoggerInterface;
import io.openkairos.kairos.kernel.result.Result;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;

public final class SetupSuperUser {

    private final LoggerInterface logger;
    private final SuperUserRepositoryInterface superUserRepository;
    private final PasswordHasherInterface passwordHasher;
    private final IdGeneratorInterface idGenerator;

    public SetupSuperUser(
            LoggerInterface logger,
            SuperUserRepositoryInterface superUserRepository,
            PasswordHasherInterface passwordHasher,
            IdGeneratorInterface idGenerator) {
        this.logger = logger;
        this.superUserRepository = superUserRepository;
        this.passwordHasher = passwordHasher;
        this.idGenerator = idGenerator;
    }

    public Result<SetupSuperUserOutcome> execute(SetupSuperUserCommand command) {
        if (superUserRepository.exists()) {
            logger.info("Super user already exists; skipping setup.");
            return Result.success(SetupSuperUserOutcome.ALREADY_EXISTS);
        }

        var superUser =
                new SuperUser(idGenerator.generate(), command.username(), passwordHasher.hash(command.password()));
        superUserRepository.save(superUser);
        logger.info("Super user created successfully.");
        return Result.success(SetupSuperUserOutcome.CREATED);
    }
}
