package io.openkairos.kairos.bootstrap.superuser;

import io.openkairos.kairos.kernel.logger.LoggerInterface;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.atMostOnce;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

final class SetupSuperUserTest {

    @Test
    void it_skips_creation_when_a_super_user_already_exists() {
        var repository = mock(SuperUserRepositoryInterface.class);
        var logger = mock(LoggerInterface.class);
        var passwordHasher = mock(PasswordHasherInterface.class);
        when(repository.exists()).thenReturn(true);
        var sut = new SetupSuperUser(logger, repository, passwordHasher);
        var command = SetupSuperUserCommand.of("kairos", "test-password");

        var created = sut.execute(command);

        assertFalse(created);
        verify(repository, atMostOnce()).exists();
        verify(repository, never()).create(any(), any());
        verify(passwordHasher, never()).hash(any());
    }

    @Test
    void it_creates_a_super_user_with_a_hashed_password_when_none_exists() {
        var repository = mock(SuperUserRepositoryInterface.class);
        var logger = mock(LoggerInterface.class);
        var passwordHasher = mock(PasswordHasherInterface.class);
        when(repository.exists()).thenReturn(false);
        when(passwordHasher.hash("test-password")).thenReturn("hashed-password");
        var sut = new SetupSuperUser(logger, repository, passwordHasher);
        var command = SetupSuperUserCommand.of("kairos", "test-password");

        var created = sut.execute(command);

        assertTrue(created);
        verify(passwordHasher).hash("test-password");
        verify(repository).create("kairos", "hashed-password");
    }
}
