package io.openkairos.kairos.bootstrap.superuser.application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.atMostOnce;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import io.openkairos.kairos.bootstrap.superuser.domain.SuperUser;
import io.openkairos.kairos.bootstrap.superuser.domain.SuperUserRepositoryInterface;
import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.kernel.id.IdGeneratorInterface;
import io.openkairos.kairos.kernel.logger.LoggerInterface;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

final class SetupSuperUserTest {

    @Test
    void it_skips_creation_when_a_super_user_already_exists() {
        var repository = mock(SuperUserRepositoryInterface.class);
        var idGenerator = mock(IdGeneratorInterface.class);
        var logger = mock(LoggerInterface.class);
        var passwordHasher = mock(PasswordHasherInterface.class);
        when(repository.exists()).thenReturn(true);
        var sut = new SetupSuperUser(logger, repository, passwordHasher, idGenerator);
        var command = SetupSuperUserCommand.of("kairos", "test-password");

        var result = sut.execute(command);

        assertTrue(result.isSuccess());
        assertEquals(SetupSuperUserOutcome.ALREADY_EXISTS, result.value());
        verify(repository, atMostOnce()).exists();
        verify(repository, never()).save(any());
        verify(passwordHasher, never()).hash(any());
        verify(idGenerator, never()).generate();
    }

    @Test
    void it_creates_a_super_user_with_a_hashed_password_when_none_exists() {
        var repository = mock(SuperUserRepositoryInterface.class);
        var idGenerator = mock(IdGeneratorInterface.class);
        var logger = mock(LoggerInterface.class);
        var passwordHasher = mock(PasswordHasherInterface.class);
        var id = mock(Id.class);
        when(repository.exists()).thenReturn(false);
        when(passwordHasher.hash("test-password")).thenReturn("hashed-password");
        when(idGenerator.generate()).thenReturn(id);
        var sut = new SetupSuperUser(logger, repository, passwordHasher, idGenerator);
        var command = SetupSuperUserCommand.of("kairos", "test-password");

        var result = sut.execute(command);

        assertTrue(result.isSuccess());
        assertEquals(SetupSuperUserOutcome.CREATED, result.value());
        verify(passwordHasher).hash("test-password");
        verify(idGenerator).generate();
        var superUser = ArgumentCaptor.forClass(SuperUser.class);
        verify(repository).save(superUser.capture());
        assertSame(id, superUser.getValue().id());
        assertEquals("kairos", superUser.getValue().username());
        assertEquals("hashed-password", superUser.getValue().password());
    }
}
