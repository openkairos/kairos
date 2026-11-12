package io.openkairos.kairos.adapters.interfaces.http.source;

import io.openkairos.kairos.source.application.create.CreateSourceCommand;
import jakarta.validation.constraints.NotBlank;

public record CreateSourceRequest(@NotBlank String name, String description, String appIdentifier) {

    CreateSourceCommand toCommand(String workspaceId) {
        return new CreateSourceCommand(workspaceId, name, description, appIdentifier);
    }
}
