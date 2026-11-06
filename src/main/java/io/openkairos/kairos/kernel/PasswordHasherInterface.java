package io.openkairos.kairos.kernel;

public interface PasswordHasherInterface {

    String hash(String plainPassword);
}
