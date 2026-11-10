package io.openkairos.kairos.kernel.result;

import org.junit.jupiter.api.Test;

import java.net.URI;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

final class ProblemTest {

    @Test
    void it_copies_the_error_map() {
        var errors = new LinkedHashMap<String, List<String>>();
        errors.put("fieldOne", List.of("first message"));

        var problem = problem(errors);

        assertNotSame(errors, problem.errors());
    }

    @Test
    void it_copies_error_messages() {
        var messages = new ArrayList<>(List.of("first message"));
        var errors = new LinkedHashMap<String, List<String>>();
        errors.put("fieldOne", messages);

        var problem = problem(errors);

        assertNotSame(messages, problem.errors().get("fieldOne"));
    }

    @Test
    void it_exposes_an_immutable_error_map() {
        var problem = problem(Map.of("fieldOne", List.of("first message")));

        assertThrows(UnsupportedOperationException.class, () -> problem.errors().put("fieldThree", List.of()));
    }

    @Test
    void it_exposes_immutable_error_messages() {
        var problem = problem(Map.of("fieldOne", List.of("first message")));

        assertThrows(UnsupportedOperationException.class, () -> problem.errors().get("fieldOne").add("second message"));
    }

    private Problem problem(Map<String, List<String>> errors) {
        return new Problem(
                URI.create("urn:openkairos:problem:example"),
                "Example problem",
                400,
                "An example problem occurred.",
                errors
        );
    }
}
