package io.openkairos.kairos.workspace.domain;

import io.openkairos.kairos.kernel.annotation.AsModel;
import io.openkairos.kairos.kernel.id.Id;

import java.util.List;

@AsModel
public record Workspace(Id id, String name, String slug, List<String> environments) {

    public Workspace {
        environments = List.copyOf(environments);
    }
}
