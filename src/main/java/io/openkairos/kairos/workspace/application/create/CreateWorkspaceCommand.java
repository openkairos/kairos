package io.openkairos.kairos.workspace.application.create;

import io.openkairos.kairos.kernel.annotation.AsModel;

import java.util.List;

@AsModel
public record CreateWorkspaceCommand(String name, String slug, List<String> environments) {

    private static final List<String> DEFAULT_ENVIRONMENTS = List.of("default");

    public CreateWorkspaceCommand {
        environments = environments == null || environments.isEmpty()
                ? DEFAULT_ENVIRONMENTS
                : List.copyOf(environments);
    }
}
