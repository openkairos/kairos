package io.openkairos.kairos.feature.source;

import io.openkairos.kairos.testing.FeatureTest;
import io.openkairos.kairos.testing.mongo.populator.UserPopulator;
import io.openkairos.kairos.testing.mongo.populator.WorkspacePopulator;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

final class CreateSourceFeatureTest extends FeatureTest {

    @Autowired
    private UserPopulator userPopulator;

    @Autowired
    private WorkspacePopulator workspacePopulator;

    @Test
    void create_source() throws Exception {
        var user = userPopulator.superUser();
        var workspace = workspacePopulator.workspace();

        mockMvc.perform(postJson("/workspaces/" + workspace.id().value() + "/sources")
                        .with(actAs(user))
                        .content(jsonContent(Map.of(
                                "name", "Acme iOS",
                                "description", "iOS app",
                                "appIdentifier", "com.acme.ios"
                        ))))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", Matchers.startsWith(
                        "/workspaces/" + workspace.id().value() + "/sources/"
                )))
                .andExpect(jsonPath("$.id").isString())
                .andExpect(jsonPath("$.workspaceId").value(workspace.id().value()))
                .andExpect(jsonPath("$.name").value("Acme iOS"))
                .andExpect(jsonPath("$.description").value("iOS app"))
                .andExpect(jsonPath("$.appIdentifier").value("com.acme.ios"))
                .andExpect(jsonPath("$.writeKey").isString());
    }
}
