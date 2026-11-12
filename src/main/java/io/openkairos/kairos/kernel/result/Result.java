package io.openkairos.kairos.kernel.result;

import io.openkairos.kairos.kernel.annotation.AsModel;
import java.util.Objects;
import java.util.function.Function;

@AsModel
public final class Result<T> {

    private final T value;
    private final Problem problem;

    private Result(T value, Problem problem) {
        this.value = value;
        this.problem = problem;
    }

    public static <T> Result<T> success(T value) {
        return new Result<>(Objects.requireNonNull(value), null);
    }

    public static <T> Result<T> failure(Problem problem) {
        return new Result<>(null, Objects.requireNonNull(problem));
    }

    public boolean isSuccess() {
        return problem == null;
    }

    public boolean isFailure() {
        return !isSuccess();
    }

    public T value() {
        if (isFailure()) {
            throw new IllegalStateException("A failure result does not contain a value.");
        }

        return value;
    }

    public Problem problem() {
        if (isSuccess()) {
            throw new IllegalStateException("A success result does not contain a problem.");
        }

        return problem;
    }

    public <R> R fold(Function<? super T, ? extends R> onSuccess, Function<? super Problem, ? extends R> onFailure) {
        Objects.requireNonNull(onSuccess);
        Objects.requireNonNull(onFailure);

        return isSuccess() ? onSuccess.apply(value) : onFailure.apply(problem);
    }
}
