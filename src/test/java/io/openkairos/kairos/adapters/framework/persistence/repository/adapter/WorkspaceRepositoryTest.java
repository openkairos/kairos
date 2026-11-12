package io.openkairos.kairos.adapters.framework.persistence.repository.adapter;

import static org.junit.jupiter.api.Assertions.assertThrows;

import io.openkairos.kairos.kernel.id.Id;
import io.openkairos.kairos.testing.IntegrationTest;
import io.openkairos.kairos.workspace.domain.Workspace;
import io.openkairos.kairos.workspace.domain.exception.WorkspaceSlugConflictException;
import java.util.List;
import java.util.Map;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;

@DataMongoTest
@Import(WorkspaceRepository.class)
final class WorkspaceRepositoryTest extends IntegrationTest {

    @Autowired
    private WorkspaceRepository sut;

    @Test
    void it_saves_a_workspace() {
        Id id = () -> "507f1f77bcf86cd799439011";
        var workspace = new Workspace(id, "Acme", "acme", List.of("production"));

        sut.save(workspace);

        mongoAssertions.assertDocumentExists(
                "workspaces",
                Map.of(
                        "_id",
                        new ObjectId(id.value()),
                        "name",
                        "Acme",
                        "slug",
                        "acme",
                        "environments",
                        List.of("production")));
    }

    @Test
    void it_updates_an_existing_workspace() {
        Id id = () -> "507f1f77bcf86cd799439011";
        sut.save(new Workspace(id, "Acme", "acme", List.of("development")));
        var workspace = new Workspace(id, "Acme", "acme", List.of("production"));

        sut.save(workspace);

        mongoAssertions.assertDocumentExists(
                "workspaces",
                Map.of(
                        "_id",
                        new ObjectId(id.value()),
                        "name",
                        "Acme",
                        "slug",
                        "acme",
                        "environments",
                        List.of("production")));
    }

    @Test
    void it_reports_a_conflict_for_a_duplicate_slug() {
        var first = new Workspace(() -> "507f1f77bcf86cd799439011", "Acme", "acme", List.of("production"));
        var second = new Workspace(() -> "507f1f77bcf86cd799439012", "Another Acme", "acme", List.of("production"));
        sut.save(first);

        assertThrows(WorkspaceSlugConflictException.class, () -> sut.save(second));
    }
}
