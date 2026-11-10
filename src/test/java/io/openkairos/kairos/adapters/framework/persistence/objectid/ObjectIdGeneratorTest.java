package io.openkairos.kairos.adapters.framework.persistence.objectid;

import io.openkairos.kairos.kernel.id.IdGeneratorInterface;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

final class ObjectIdGeneratorTest {

    private final IdGeneratorInterface sut = new ObjectIdGenerator();

    @Test
    void it_generates_a_valid_object_id() {
        var id = sut.generate();

        assertTrue(ObjectId.isValid(id.value()));
    }

    @Test
    void it_generates_unique_ids() {
        var firstId = sut.generate();
        var secondId = sut.generate();

        assertNotEquals(firstId.value(), secondId.value());
    }
}
