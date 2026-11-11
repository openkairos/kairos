package io.openkairos.kairos.adapters.interfaces.http.workspace;

import io.openkairos.kairos.workspace.domain.Workspace;

import java.util.List;

public record CreateWorkspaceResponse(String id, String name, String slug, List<String> environments) {

    static CreateWorkspaceResponse from(Workspace workspace) {
        return new CreateWorkspaceResponse(
                workspace.id().value(),
                workspace.name(),
                workspace.slug(),
                workspace.environments()
        );
    }
}
