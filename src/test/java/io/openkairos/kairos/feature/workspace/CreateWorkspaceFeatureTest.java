package io.openkairos.kairos.feature.workspace;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import io.openkairos.kairos.testing.FeatureTest;
import io.openkairos.kairos.testing.mongo.populator.UserPopulator;
import java.util.List;
import java.util.Map;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

final class CreateWorkspaceFeatureTest extends FeatureTest {

    @Autowired
    private UserPopulator userPopulator;

    @Test
    void create_workspace() throws Exception {
        var user = userPopulator.superUser();

        mockMvc.perform(postJson("/workspaces")
                        .with(actAs(user))
                        .content(jsonContent(Map.of(
                                "name", "Acme",
                                "slug", "acme",
                                "environments", List.of("development", "production")))))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", Matchers.startsWith("/workspaces/")))
                .andExpect(jsonPath("$.id").isString())
                .andExpect(jsonPath("$.name").value("Acme"))
                .andExpect(jsonPath("$.slug").value("acme"))
                .andExpect(jsonPath("$.environments[0]").value("development"))
                .andExpect(jsonPath("$.environments[1]").value("production"));
    }
}
