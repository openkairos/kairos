package io.openkairos.kairos.adapters.framework.security.password;

import io.openkairos.kairos.adapters.framework.persistence.UserDocument;
import io.openkairos.kairos.adapters.framework.persistence.UserRepository;
import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import io.openkairos.kairos.security.auth.login.InvalidCredentialsException;
import io.openkairos.kairos.security.auth.login.PasswordCredentials;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

final class PasswordCredentialsVerifierTest {

    @Test
    void a_user_is_resolved_when_password_credentials_are_valid() {
        var repository = mock(UserRepository.class);
        var passwordHasher = mock(PasswordHasherInterface.class);
        var credentials = new PasswordCredentials("jane", "my-secret-password");
        var id = new ObjectId();
        var document = new UserDocument(id, "jane", "hashed-password");
        when(repository.findByUsername("jane")).thenReturn(Optional.of(document));
        when(passwordHasher.verify("hashed-password", "my-secret-password")).thenReturn(true);
        var sut = new PasswordCredentialsVerifier(repository, passwordHasher);

        var user = sut.verify(credentials);

        assertNotNull(user);
        assertEquals(id.toHexString(), user.id());
        assertEquals("jane", user.username());
        verify(repository).findByUsername("jane");
        verify(passwordHasher).verify("hashed-password", "my-secret-password");
    }

    @Test
    void invalid_credentials_are_reported_when_the_username_is_unknown() {
        var repository = mock(UserRepository.class);
        var passwordHasher = mock(PasswordHasherInterface.class);
        var credentials = new PasswordCredentials("jane", "my-secret-password");
        when(repository.findByUsername("jane")).thenReturn(Optional.empty());
        var sut = new PasswordCredentialsVerifier(repository, passwordHasher);

        assertThrows(InvalidCredentialsException.class, () -> sut.verify(credentials));

        verify(repository).findByUsername("jane");
        verify(passwordHasher, never()).verify("hashed-password", "my-secret-password");
    }

    @Test
    void invalid_credentials_are_reported_when_the_password_is_incorrect() {
        var repository = mock(UserRepository.class);
        var passwordHasher = mock(PasswordHasherInterface.class);
        var credentials = new PasswordCredentials("jane", "my-secret-password");
        var document = new UserDocument(new ObjectId(), "jane", "hashed-password");
        when(repository.findByUsername("jane")).thenReturn(Optional.of(document));
        when(passwordHasher.verify("hashed-password", "my-secret-password")).thenReturn(false);
        var sut = new PasswordCredentialsVerifier(repository, passwordHasher);

        assertThrows(InvalidCredentialsException.class, () -> sut.verify(credentials));

        verify(repository).findByUsername("jane");
        verify(passwordHasher).verify("hashed-password", "my-secret-password");
    }
}
