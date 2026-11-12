package io.openkairos.kairos.adapters.interfaces.http.workspace;

import io.openkairos.kairos.adapters.interfaces.http.ProblemDetailMapper;
import io.openkairos.kairos.workspace.application.create.CreateWorkspace;
import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public final class WorkspaceController {

    private final CreateWorkspace createWorkspace;
    private final ProblemDetailMapper problemDetailMapper;

    public WorkspaceController(CreateWorkspace createWorkspace, ProblemDetailMapper problemDetailMapper) {
        this.createWorkspace = createWorkspace;
        this.problemDetailMapper = problemDetailMapper;
    }

    @PostMapping(path = "/workspaces", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> createWorkspace(@Valid @RequestBody CreateWorkspaceRequest request) {
        return createWorkspace
                .execute(request.toCommand())
                .fold(
                        workspace -> ResponseEntity.created(URI.create(
                                        "/workspaces/" + workspace.id().value()))
                                .body(CreateWorkspaceResponse.from(workspace)),
                        problem -> ResponseEntity.status(problem.status()).body(problemDetailMapper.map(problem)));
    }
}
