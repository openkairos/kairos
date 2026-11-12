package io.openkairos.kairos.adapters.interfaces.http;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.lang.reflect.Method;
import java.net.URI;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

final class ApiExceptionHandlerTest {

    @Test
    void it_groups_validation_messages_by_field() throws Exception {
        MethodArgumentNotValidException exception = validationException(
                new FieldError("request", "fieldOne", "first message"),
                new FieldError("request", "fieldOne", "second message"),
                new FieldError("request", "fieldTwo", "third message"));
        ApiExceptionHandler handler = new ApiExceptionHandler(new ProblemDetailMapper());

        ProblemDetail problem = handler.validationFailed(exception);

        assertEquals(URI.create("urn:openkairos:problem:validation-failed"), problem.getType());
        assertEquals("Validation failed", problem.getTitle());
        assertEquals(HttpStatus.BAD_REQUEST.value(), problem.getStatus());
        assertEquals("One or more fields are invalid.", problem.getDetail());
        assertEquals(
                Map.of(
                        "fieldOne", List.of("first message", "second message"),
                        "fieldTwo", List.of("third message")),
                problem.getProperties().get("errors"));
    }

    private MethodArgumentNotValidException validationException(FieldError... errors) throws Exception {
        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(new Object(), "request");
        for (FieldError error : errors) {
            bindingResult.addError(error);
        }

        Method method = ApiExceptionHandlerTest.class.getDeclaredMethod("request", Object.class);
        return new MethodArgumentNotValidException(new MethodParameter(method, 0), bindingResult);
    }

    @SuppressWarnings("unused")
    private void request(Object request) {}
}
