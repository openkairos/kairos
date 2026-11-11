package io.openkairos.kairos.adapters.interfaces.http;

import io.openkairos.kairos.kernel.result.Problem;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.stereotype.Component;

@Component
public final class ProblemDetailMapper {

    public ProblemDetail map(Problem problem) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatusCode.valueOf(problem.status()),
                problem.detail()
        );
        problemDetail.setType(problem.type());
        problemDetail.setTitle(problem.title());

        if (!problem.errors().isEmpty()) {
            problemDetail.setProperty("errors", problem.errors());
        }

        return problemDetail;
    }
}
