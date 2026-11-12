package io.openkairos.kairos.adapters.framework.persistence.repository.adapter;

import io.openkairos.kairos.adapters.framework.persistence.document.SourceDocument;
import io.openkairos.kairos.source.domain.Source;
import io.openkairos.kairos.source.domain.SourceRepositoryInterface;
import org.springframework.stereotype.Component;

@Component
public final class SourceRepository implements SourceRepositoryInterface {

    private final io.openkairos.kairos.adapters.framework.persistence.repository.springdata.SourceRepository sourceRepository;

    public SourceRepository(
            io.openkairos.kairos.adapters.framework.persistence.repository.springdata.SourceRepository sourceRepository
    ) {
        this.sourceRepository = sourceRepository;
    }

    @Override
    public void save(Source source) {
        sourceRepository.save(SourceDocument.from(source));
    }
}
