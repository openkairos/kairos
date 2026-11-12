package io.openkairos.kairos.kernel.id;

import java.util.Objects;

public interface Id {
    String value();

    static Id from(String value) {
        Objects.requireNonNull(value);

        return () -> value;
    }
}
