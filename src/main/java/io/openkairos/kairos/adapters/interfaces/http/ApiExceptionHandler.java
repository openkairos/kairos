package io.openkairos.kairos.adapters.interfaces.http;

import io.openkairos.kairos.kernel.result.Problem;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public final class ApiExceptionHandler {

    private final ProblemDetailMapper problemDetailMapper;

    public ApiExceptionHandler(ProblemDetailMapper problemDetailMapper) {
        this.problemDetailMapper = problemDetailMapper;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail validationFailed(MethodArgumentNotValidException exception) {
        Map<String, List<String>> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.groupingBy(
                        FieldError::getField,
                        Collectors.mapping(FieldError::getDefaultMessage, Collectors.toList())
                ));

        return problemDetailMapper.map(new Problem(
                URI.create("urn:openkairos:problem:validation-failed"),
                "Validation failed",
                HttpStatus.BAD_REQUEST.value(),
                "One or more fields are invalid.",
                errors
        ));
    }
}
