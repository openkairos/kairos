package io.openkairos.kairos.feature.auth;

import io.openkairos.kairos.testing.FeatureTest;
import io.openkairos.kairos.testing.mongo.populator.UserPopulator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

final class PasswordLoginFeatureTest extends FeatureTest {

    @Autowired
    private UserPopulator userPopulator;

    @Test
    void a_guest_can_login_with_username_and_password() throws Exception {
        String username = "super-user";
        String password = "my-secret-password";
        userPopulator.superUser(username, password);

        postJson(
                "/auth/login",
                Map.of(
                        "username", username,
                        "password", password
                ))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").isString())
                .andExpect(jsonPath("$.refreshToken").isString())
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.expiresIn").isNumber());
    }
}
