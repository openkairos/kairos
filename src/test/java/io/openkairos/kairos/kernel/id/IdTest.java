package io.openkairos.kairos.kernel.id;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

final class IdTest {

    @Test
    void it_creates_an_id_from_a_string_value() {
        var id = Id.from("workspace-id");

        assertEquals("workspace-id", id.value());
    }
}
