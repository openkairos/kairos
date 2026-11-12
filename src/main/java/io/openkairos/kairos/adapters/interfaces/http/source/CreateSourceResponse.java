package io.openkairos.kairos.adapters.interfaces.http.source;

import io.openkairos.kairos.source.application.create.CreatedSource;

public record CreateSourceResponse(
        String id, String workspaceId, String name, String description, String appIdentifier, String writeKey) {

    static CreateSourceResponse from(CreatedSource source) {
        return new CreateSourceResponse(
                source.id().value(),
                source.workspaceId().value(),
                source.name(),
                source.description(),
                source.appIdentifier(),
                source.writeKey());
    }
}
