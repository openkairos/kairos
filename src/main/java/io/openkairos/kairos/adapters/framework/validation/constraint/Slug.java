package io.openkairos.kairos.adapters.framework.validation.constraint;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;
import jakarta.validation.constraints.Pattern;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = {})
@Pattern(regexp = "^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$")
@ReportAsSingleViolation
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
public @interface Slug {

    String message() default "must be a valid slug";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
