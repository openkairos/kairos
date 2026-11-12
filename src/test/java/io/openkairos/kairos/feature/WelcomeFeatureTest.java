package io.openkairos.kairos.feature;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import io.openkairos.kairos.testing.FeatureTest;
import org.junit.jupiter.api.Test;

final class WelcomeFeatureTest extends FeatureTest {

    @Test
    void returns_welcome_message() throws Exception {
        mockMvc.perform(getJson("/"))
                .andExpect(status().isOk())
                .andExpect(content().string("Kairos: The right moment for customer data."));
    }
}
