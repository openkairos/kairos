package io.openkairos.kairos.source.application.create;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import io.openkairos.kairos.source.domain.Source;
import io.openkairos.kairos.source.domain.SourceRepositoryInterface;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;

final class CreateSourceTest {

    @Test
    void it_creates_a_source() {
        var savedSource = new AtomicReference<Source>();
        SourceRepositoryInterface repository = savedSource::set;
        Id sourceId = () -> "source-id";
        var passwordHasher = mock(PasswordHasherInterface.class);
        when(passwordHasher.hash(anyString())).thenReturn("hashed-write-key");
        var useCase = new CreateSource(repository, () -> sourceId, passwordHasher);
        var command = new CreateSourceCommand("workspace-id", "Acme iOS", "iOS app", "com.acme.ios");

        var result = useCase.execute(command);

        var createdSource = result.value();

        assertEquals(sourceId, savedSource.get().id());
        assertEquals("workspace-id", savedSource.get().workspaceId().value());
        assertEquals("Acme iOS", savedSource.get().name());
        assertEquals("iOS app", savedSource.get().description());
        assertEquals("com.acme.ios", savedSource.get().appIdentifier());
        assertEquals("hashed-write-key", savedSource.get().writeKey());
        verify(passwordHasher).hash(createdSource.writeKey());
    }
}
