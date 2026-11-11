package io.openkairos.kairos.workspace.application.create;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

final class CreateWorkspaceCommandTest {

    @Test
    void it_defaults_environments_when_they_are_omitted() {
        var command = new CreateWorkspaceCommand("Acme", "acme", null);

        assertEquals(List.of("default"), command.environments());
    }

    @Test
    void it_defaults_environments_when_they_are_empty() {
        var command = new CreateWorkspaceCommand("Acme", "acme", List.of());

        assertEquals(List.of("default"), command.environments());
    }
}
