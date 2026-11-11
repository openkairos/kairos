package io.openkairos.kairos.adapters.framework.persistence.repository.adapter;

import io.openkairos.kairos.adapters.framework.persistence.document.WorkspaceDocument;
import io.openkairos.kairos.workspace.domain.Workspace;
import io.openkairos.kairos.workspace.domain.WorkspaceRepositoryInterface;
import io.openkairos.kairos.workspace.domain.exception.WorkspaceSlugConflictException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Component;

@Component
public final class WorkspaceRepository implements WorkspaceRepositoryInterface {

    private final io.openkairos.kairos.adapters.framework.persistence.repository.springdata.WorkspaceRepository workspaceRepository;

    public WorkspaceRepository(
            io.openkairos.kairos.adapters.framework.persistence.repository.springdata.WorkspaceRepository workspaceRepository
    ) {
        this.workspaceRepository = workspaceRepository;
    }

    @Override
    public void save(Workspace workspace) throws WorkspaceSlugConflictException {
        try {
            workspaceRepository.save(WorkspaceDocument.from(workspace));
        } catch (DuplicateKeyException exception) {
            throw new WorkspaceSlugConflictException();
        }
    }
}
