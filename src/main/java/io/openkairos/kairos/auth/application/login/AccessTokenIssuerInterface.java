package io.openkairos.kairos.auth.application.login;

import io.openkairos.kairos.auth.domain.User;

public interface AccessTokenIssuerInterface {

    AccessToken issue(User user);
}
