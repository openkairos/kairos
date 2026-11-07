package io.openkairos.kairos.bootstrap.superuser;

public interface SuperUserRepositoryInterface {

    boolean exists();

    void create(String username, String passwordHash);
}
