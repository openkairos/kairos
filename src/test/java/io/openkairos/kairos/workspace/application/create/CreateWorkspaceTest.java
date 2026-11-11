package io.openkairos.kairos.workspace.application.create;

import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.workspace.domain.Workspace;
import io.openkairos.kairos.workspace.domain.WorkspaceRepositoryInterface;
import io.openkairos.kairos.workspace.domain.exception.WorkspaceSlugConflictException;
import org.junit.jupiter.api.Test;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

final class CreateWorkspaceTest {

    @Test
    void it_saves_a_workspace_with_a_generated_identity() {
        var capturedWorkspace = new AtomicReference<Workspace>();
        WorkspaceRepositoryInterface repository = capturedWorkspace::set;
        Id id = () -> "workspace-id";
        var useCase = new CreateWorkspace(repository, () -> id);
        var command = new CreateWorkspaceCommand("Acme", "acme", List.of("production"));

        var result = useCase.execute(command);

        assertTrue(result.isSuccess());
        assertEquals(id, capturedWorkspace.get().id());
    }

    @Test
    void it_returns_a_problem_when_the_slug_already_exists() {
        WorkspaceRepositoryInterface repository = _ -> {
            throw new WorkspaceSlugConflictException();
        };
        var useCase = new CreateWorkspace(repository, () -> () -> "workspace-id");
        var command = new CreateWorkspaceCommand("Acme", "acme", List.of("production"));

        var result = useCase.execute(command);

        assertTrue(result.isFailure());
        assertEquals(URI.create("urn:openkairos:problem:workspace-slug-conflict"), result.problem().type());
        assertEquals("Workspace slug already exists", result.problem().title());
        assertEquals(409, result.problem().status());
        assertEquals("A workspace with this slug already exists.", result.problem().detail());
        assertEquals(Map.of("slug", List.of("is already in use")), result.problem().errors());
    }
}
