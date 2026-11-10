package io.openkairos.kairos.adapters.interfaces.http;

import io.openkairos.kairos.kernel.result.Problem;
import org.junit.jupiter.api.Test;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

final class ProblemDetailMapperTest {

    @Test
    void it_maps_the_standard_problem_fields() {
        var problem = new Problem(
                URI.create("urn:openkairos:problem:example"),
                "Example problem",
                400,
                "An example problem occurred.",
                Map.of()
        );
        var mapper = new ProblemDetailMapper();

        var problemDetail = mapper.map(problem);

        assertEquals(problem.type(), problemDetail.getType());
        assertEquals(problem.title(), problemDetail.getTitle());
        assertEquals(problem.status(), problemDetail.getStatus());
        assertEquals(problem.detail(), problemDetail.getDetail());
        assertNull(problemDetail.getProperties());
    }

    @Test
    void it_adds_errors_when_present() {
        var errors = Map.of("fieldOne", List.of("first message"));
        var problem = new Problem(
                URI.create("urn:openkairos:problem:example"),
                "Example problem",
                400,
                "An example problem occurred.",
                errors
        );
        var mapper = new ProblemDetailMapper();

        var problemDetail = mapper.map(problem);

        assertEquals(errors, Objects.requireNonNull(problemDetail.getProperties()).get("errors"));
    }
}
