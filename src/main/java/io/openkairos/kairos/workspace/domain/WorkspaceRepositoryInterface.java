package io.openkairos.kairos.workspace.domain;

import io.openkairos.kairos.workspace.domain.exception.WorkspaceSlugConflictException;

public interface WorkspaceRepositoryInterface {

    void save(Workspace workspace) throws WorkspaceSlugConflictException;
}
