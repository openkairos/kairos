package io.openkairos.kairos.source.application.create;

import io.openkairos.kairos.kernel.id.IdGeneratorInterface;
import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.kernel.result.Result;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import io.openkairos.kairos.source.domain.Source;
import io.openkairos.kairos.source.domain.SourceRepositoryInterface;

import java.security.SecureRandom;
import java.util.Base64;

public final class CreateSource {

    private final SourceRepositoryInterface sourceRepository;
    private final IdGeneratorInterface idGenerator;
    private final PasswordHasherInterface passwordHasher;

    private final SecureRandom secureRandom = new SecureRandom();

    public CreateSource(
            SourceRepositoryInterface sourceRepository,
            IdGeneratorInterface idGenerator,
            PasswordHasherInterface passwordHasher
    ) {
        this.sourceRepository = sourceRepository;
        this.idGenerator = idGenerator;
        this.passwordHasher = passwordHasher;
    }

    public Result<CreatedSource> execute(CreateSourceCommand command) {
        var writeKey = generateWriteKey();
        var source = new Source(
                idGenerator.generate(),
                Id.from(command.workspaceId()),
                command.name(),
                command.description(),
                command.appIdentifier(),
                passwordHasher.hash(writeKey)
        );
        sourceRepository.save(source);

        return Result.success(CreatedSource.from(source, writeKey));
    }

    private String generateWriteKey() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);

        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
