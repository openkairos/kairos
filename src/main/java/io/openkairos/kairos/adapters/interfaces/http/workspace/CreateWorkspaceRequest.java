package io.openkairos.kairos.adapters.interfaces.http.workspace;

import io.openkairos.kairos.adapters.framework.validation.constraint.Slug;
import io.openkairos.kairos.workspace.application.create.CreateWorkspaceCommand;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.List;

public record CreateWorkspaceRequest(
        @NotBlank String name,
        @NotBlank
        @Slug String slug,
        @UniqueElements(message = "must contain unique values") List<@NotBlank String> environments
) {

    CreateWorkspaceCommand toCommand() {
        return new CreateWorkspaceCommand(name, slug, environments);
    }
}
