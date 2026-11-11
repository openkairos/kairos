package io.openkairos.kairos.testing;

import io.openkairos.kairos.kernel.security.Authenticatable;
import io.openkairos.kairos.testing.mongo.assertion.MongoAssertions;
import io.openkairos.kairos.testing.mongo.populator.UserPopulator;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;
import org.junit.jupiter.api.parallel.ResourceAccessMode;
import org.junit.jupiter.api.parallel.ResourceLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@SpringBootTest
@AutoConfigureMockMvc
@Import({IntegrationTestConfiguration.class, MongoAssertions.class, UserPopulator.class, TearDown.class})
@Execution(ExecutionMode.SAME_THREAD)
@ResourceLock(value = "mongo-tests", mode = ResourceAccessMode.READ_WRITE)
public abstract class FeatureTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TearDown tearDown;

    @AfterEach
    void tearDown() {
        tearDown.clearMongoCollections();
    }

    protected MockHttpServletRequestBuilder post(String path) {
        return MockMvcRequestBuilders.post(path);
    }

    protected MockHttpServletRequestBuilder postJson(String path) {
        return post(path).contentType(MediaType.APPLICATION_JSON);
    }

    protected MockHttpServletRequestBuilder get(String path) {
        return MockMvcRequestBuilders.get(path);
    }

    protected MockHttpServletRequestBuilder getJson(String path) {
        return get(path).accept(MediaType.APPLICATION_JSON);
    }

    protected String jsonContent(Object value) throws Exception {
        return objectMapper.writeValueAsString(value);
    }

    protected RequestPostProcessor actAs(Authenticatable user) {
        return jwt().jwt(token -> token.subject(user.id().value()));
    }
}
