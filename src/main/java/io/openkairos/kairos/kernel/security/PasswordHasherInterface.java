package io.openkairos.kairos.kernel.security;

public interface PasswordHasherInterface {

    String hash(String plainPassword);
}
