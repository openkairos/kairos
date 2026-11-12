package io.openkairos.kairos.adapters.interfaces.http.workspace;

import io.openkairos.kairos.adapters.framework.validation.constraint.Slug;
import io.openkairos.kairos.workspace.application.create.CreateWorkspaceCommand;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import org.hibernate.validator.constraints.UniqueElements;

public record CreateWorkspaceRequest(
        @NotBlank String name,
        @NotBlank @Slug String slug,

        @UniqueElements(message = "must contain unique values")
        List<@NotBlank String> environments) {

    public CreateWorkspaceRequest {
        environments = environments == null ? null : List.copyOf(environments);
    }

    CreateWorkspaceCommand toCommand() {
        return new CreateWorkspaceCommand(name, slug, environments);
    }
}
