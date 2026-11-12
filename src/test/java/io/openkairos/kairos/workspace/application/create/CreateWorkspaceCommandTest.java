package io.openkairos.kairos.workspace.application.create;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import org.junit.jupiter.api.Test;

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
