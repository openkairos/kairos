package io.openkairos.kairos.source.application.create;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.source.domain.Source;

@AsModel
public record CreatedSource(
        Id id,
        Id workspaceId,
        String name,
        String description,
        String appIdentifier,
        String writeKey
) {

    static CreatedSource from(Source source, String writeKey) {
        return new CreatedSource(
                source.id(),
                source.workspaceId(),
                source.name(),
                source.description(),
                source.appIdentifier(),
                writeKey
        );
    }
}
