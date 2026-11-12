package io.openkairos.kairos.source.application.create;

import io.openkairos.kairos.kernel.annotation.AsModel;

@AsModel
public record CreateSourceCommand(String workspaceId, String name, String description, String appIdentifier) {}
