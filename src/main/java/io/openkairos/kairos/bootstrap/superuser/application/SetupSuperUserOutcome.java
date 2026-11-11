package io.openkairos.kairos.bootstrap.superuser.application;

import io.openkairos.kairos.kernel.annotation.AsModel;

@AsModel
public enum SetupSuperUserOutcome {
    CREATED,
    ALREADY_EXISTS
}
