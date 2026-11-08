package io.openkairos.kairos.feature;

import io.openkairos.kairos.testing.FeatureTest;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

final class WelcomeFeatureTest extends FeatureTest {

    @Test
    void returns_welcome_message() throws Exception {
        getJson("/")
                .andExpect(status().isOk())
                .andExpect(content().string("Kairos: The right moment for customer data."));
    }
}
