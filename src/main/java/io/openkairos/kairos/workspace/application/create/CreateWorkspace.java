package io.openkairos.kairos.workspace.application.create;

import io.openkairos.kairos.kernel.id.IdGeneratorInterface;
import io.openkairos.kairos.kernel.result.Problem;
import io.openkairos.kairos.kernel.result.Result;
import io.openkairos.kairos.workspace.domain.Workspace;
import io.openkairos.kairos.workspace.domain.WorkspaceRepositoryInterface;
import io.openkairos.kairos.workspace.domain.exception.WorkspaceSlugConflictException;

import java.net.URI;
import java.util.List;
import java.util.Map;

public final class CreateWorkspace {

    private static final URI WORKSPACE_SLUG_CONFLICT_TYPE = URI.create("urn:openkairos:problem:workspace-slug-conflict");
    private static final int CONFLICT_STATUS = 409;
    private final WorkspaceRepositoryInterface workspaceRepository;
    private final IdGeneratorInterface idGenerator;

    public CreateWorkspace(WorkspaceRepositoryInterface workspaceRepository, IdGeneratorInterface idGenerator) {
        this.workspaceRepository = workspaceRepository;
        this.idGenerator = idGenerator;
    }

    public Result<Workspace> execute(CreateWorkspaceCommand command) {
        var workspace = new Workspace(
                idGenerator.generate(),
                command.name(),
                command.slug(),
                command.environments()
        );

        try {
            workspaceRepository.save(workspace);
            return Result.success(workspace);
        } catch (WorkspaceSlugConflictException exception) {
            return Result.failure(workspaceSlugConflict());
        }
    }

    private Problem workspaceSlugConflict() {
        return new Problem(
                WORKSPACE_SLUG_CONFLICT_TYPE,
                "Workspace slug already exists",
                CONFLICT_STATUS,
                "A workspace with this slug already exists.",
                Map.of("slug", List.of("is already in use"))
        );
    }
}
