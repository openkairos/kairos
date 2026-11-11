package io.openkairos.kairos.bootstrap.superuser.domain;

public interface SuperUserRepositoryInterface {

    boolean exists();

    void save(SuperUser superUser);
}
