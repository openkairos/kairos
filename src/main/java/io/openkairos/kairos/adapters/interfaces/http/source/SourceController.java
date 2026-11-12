package io.openkairos.kairos.adapters.interfaces.http.source;

import io.openkairos.kairos.adapters.interfaces.http.ProblemDetailMapper;
import io.openkairos.kairos.source.application.create.CreateSource;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public final class SourceController {

    private final CreateSource createSource;
    private final ProblemDetailMapper problemDetailMapper;

    public SourceController(
            CreateSource createSource,
            ProblemDetailMapper problemDetailMapper
    ) {
        this.createSource = createSource;
        this.problemDetailMapper = problemDetailMapper;
    }

    @PostMapping(path = "/workspaces/{workspaceId}/sources", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> createSource(
            @PathVariable String workspaceId,
            @Valid @RequestBody CreateSourceRequest request
    ) {
        return createSource.execute(request.toCommand(workspaceId)).fold(
                source -> ResponseEntity.created(URI.create(
                        "/workspaces/" + workspaceId + "/sources/" + source.id().value()
                )).body(CreateSourceResponse.from(source)),
                problem -> ResponseEntity.status(problem.status()).body(problemDetailMapper.map(problem))
        );
    }
}
