package io.openkairos.kairos.framework.security.password;

import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

final class Argon2PasswordHasherTest {

    private final PasswordHasherInterface sut = new Argon2PasswordHasher();

    @Test
    void a_password_is_hashed_and_can_be_verified() {
        String password = "my-secret-password";

        String hash = sut.hash(password);
        boolean verified = sut.verify(hash, password);

        assertNotEquals(password, hash);
        assertTrue(verified);
    }

    @Test
    void a_hash_is_not_verified_by_a_different_password() {
        String password = "my-secret-password";
        String differentPassword = "a-different-password";
        String hash = sut.hash(password);

        boolean verified = sut.verify(hash, differentPassword);

        assertFalse(verified);
    }

    @Test
    void a_password_produces_different_hashes_that_both_can_be_verified() {
        String password = "my-secret-password";

        String firstHash = sut.hash(password);
        String secondHash = sut.hash(password);
        boolean firstHashVerified = sut.verify(firstHash, password);
        boolean secondHashVerified = sut.verify(secondHash, password);

        assertNotEquals(firstHash, secondHash);
        assertTrue(firstHashVerified);
        assertTrue(secondHashVerified);
    }

}
