package io.openkairos.kairos.framework.security.password;

import io.openkairos.kairos.kernel.security.PasswordHasherInterface;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public final class Argon2PasswordHasher implements PasswordHasherInterface {

    private static final int SALT_LENGTH_BYTES = 16;
    private static final int HASH_LENGTH_BYTES = 32;

    // Meet OWASP's minimum Argon2id memory, iteration, and parallelism settings.
    private static final int PARALLELISM = 1;
    private static final int MEMORY_COST_KIB = 19 * 1024;
    private static final int ITERATIONS = 2;

    private final Argon2PasswordEncoder encoder = new Argon2PasswordEncoder(
            SALT_LENGTH_BYTES, HASH_LENGTH_BYTES, PARALLELISM, MEMORY_COST_KIB, ITERATIONS
    );

    @Override
    public String hash(String plainPassword) {
        return encoder.encode(plainPassword);
    }
}
