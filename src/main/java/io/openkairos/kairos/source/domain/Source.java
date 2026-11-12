package io.openkairos.kairos.source.domain;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.kernel.id.Id;

import java.util.Objects;

@AsModel
public record Source(
        Id id,
        Id workspaceId,
        String name,
        String description,
        String appIdentifier,
        String writeKey
) {

    public Source {
        Objects.requireNonNull(id);
        Objects.requireNonNull(workspaceId);
        Objects.requireNonNull(name);
        Objects.requireNonNull(writeKey);
    }
}
