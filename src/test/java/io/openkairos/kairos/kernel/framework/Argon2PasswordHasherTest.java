package io.openkairos.kairos.kernel.framework;

import io.openkairos.kairos.kernel.PasswordHasherInterface;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

final class Argon2PasswordHasherTest {

    private final PasswordHasherInterface sut = new Argon2PasswordHasher();
    private final Argon2PasswordEncoder verifier = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    @Test
    void it_produces_a_hash_that_can_verify_the_original_password() {
        String password = "my-secret-password";

        String hash = sut.hash(password);

        assertNotEquals(password, hash);
        assertTrue(verifier.matches(password, hash));
    }

    @Test
    void it_produces_a_hash_that_rejects_a_different_password() {
        String hash = sut.hash("my-secret-password");

        assertFalse(verifier.matches("a-different-password", hash));
    }

    @Test
    void it_produces_different_hashes_for_the_same_password_that_both_remain_valid() {
        String password = "my-secret-password";

        String firstHash = sut.hash(password);
        String secondHash = sut.hash(password);

        assertNotEquals(firstHash, secondHash);
        assertTrue(verifier.matches(password, firstHash));
        assertTrue(verifier.matches(password, secondHash));
    }

    @Test
    void it_makes_a_working_password_hasher_available_through_spring_component_scanning() {
        try (var context = new AnnotationConfigApplicationContext()) {
            context.scan("io.openkairos.kairos.kernel.framework");
            context.refresh();
            var hasher = context.getBean(PasswordHasherInterface.class);

            String hash = hasher.hash("my-secret-password");

            assertTrue(verifier.matches("my-secret-password", hash));
        }
    }
}
