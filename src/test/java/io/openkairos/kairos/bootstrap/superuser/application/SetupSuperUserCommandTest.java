package io.openkairos.kairos.bootstrap.superuser.application;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

final class SetupSuperUserCommandTest {
    
    @Test
    void it_keeps_the_supplied_password_and_marks_it_as_not_generated() {
        String username = "kairos";
        String password = "test-password";

        var sut = SetupSuperUserCommand.of(username, password);

        assertEquals(username, sut.username());
        assertEquals(password, sut.password());
        assertFalse(sut.passwordGenerated());
    }

    @Test
    void it_generates_a_password_when_the_supplied_password_is_null() {
        String username = "kairos";

        var sut = SetupSuperUserCommand.of(username, null);

        assertEquals(username, sut.username());
        assertFalse(sut.password().isBlank());
        assertTrue(sut.passwordGenerated());
    }

    @Test
    void it_generates_a_password_when_the_supplied_password_is_empty() {
        String username = "kairos";

        var sut = SetupSuperUserCommand.of(username, "");

        assertEquals(username, sut.username());
        assertFalse(sut.password().isBlank());
        assertTrue(sut.passwordGenerated());
    }
}
