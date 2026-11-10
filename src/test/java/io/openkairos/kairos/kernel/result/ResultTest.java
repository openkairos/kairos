package io.openkairos.kairos.kernel.result;

import org.junit.jupiter.api.Test;

import java.net.URI;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

final class ResultTest {

    @Test
    void it_identifies_a_success() {
        var result = Result.success("value");

        assertTrue(result.isSuccess());
        assertFalse(result.isFailure());
    }

    @Test
    void it_exposes_a_success_value() {
        var result = Result.success("value");

        assertEquals("value", result.value());
    }

    @Test
    void it_rejects_problem_access_on_a_success() {
        var result = Result.success("value");

        assertThrows(IllegalStateException.class, result::problem);
    }

    @Test
    void it_identifies_a_failure() {
        var problem = problem();
        var result = Result.<String>failure(problem);

        assertFalse(result.isSuccess());
        assertTrue(result.isFailure());
    }

    @Test
    void it_exposes_a_failure_problem() {
        var problem = problem();
        var result = Result.<String>failure(problem);

        assertSame(problem, result.problem());
    }

    @Test
    void it_rejects_value_access_on_a_failure() {
        var result = Result.<String>failure(problem());

        assertThrows(IllegalStateException.class, result::value);
    }

    @Test
    void it_folds_a_success() {
        var success = Result.success("value");

        assertEquals("success: value", success.fold(
                value -> "success: " + value,
                problem -> "failure: " + problem.title()
        ));
    }

    @Test
    void it_folds_a_failure() {
        var failure = Result.<String>failure(problem());

        assertEquals("failure: Example problem", failure.fold(
                value -> "success: " + value,
                problem -> "failure: " + problem.title()
        ));
    }

    private Problem problem() {
        return new Problem(
                URI.create("urn:openkairos:problem:example"),
                "Example problem",
                400,
                "An example problem occurred.",
                Map.of()
        );
    }
}
