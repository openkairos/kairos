package io.openkairos.kairos.kernel.result;

import io.openkairos.kairos.kernel.annotation.AsModel;

import java.net.URI;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@AsModel
public record Problem(
        URI type,
        String title,
        int status,
        String detail,
        Map<String, List<String>> errors
) {

    public Problem {
        Objects.requireNonNull(type);
        Objects.requireNonNull(title);
        Objects.requireNonNull(detail);
        Objects.requireNonNull(errors);

        Map<String, List<String>> copiedErrors = new LinkedHashMap<>();
        errors.forEach((field, messages) -> copiedErrors.put(
                Objects.requireNonNull(field),
                List.copyOf(Objects.requireNonNull(messages))
        ));
        errors = Map.copyOf(copiedErrors);
    }
}
