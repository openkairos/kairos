package io.openkairos.kairos.testing;

import io.openkairos.kairos.kernel.security.Authenticatable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@SpringBootTest
@AutoConfigureMockMvc
public abstract class FeatureTest extends IntegrationTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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

    protected String jsonContent(Object value) {
        return objectMapper.writeValueAsString(value);
    }

    protected RequestPostProcessor actAs(Authenticatable user) {
        return jwt().jwt(token -> token.subject(user.id().value()));
    }
}
