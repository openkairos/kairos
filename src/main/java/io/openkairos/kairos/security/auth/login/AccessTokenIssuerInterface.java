package io.openkairos.kairos.security.auth.login;

import io.openkairos.kairos.security.auth.User;

public interface AccessTokenIssuerInterface {

    AccessToken issue(User user);
}
