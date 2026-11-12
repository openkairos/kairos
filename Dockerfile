# Packages the verified Spring Boot JAR for runtime.
FROM eclipse-temurin:25-jre AS application-runtime

ARG APPLICATION_VERSION
ARG VCS_REF

LABEL org.opencontainers.image.version=$APPLICATION_VERSION \
	org.opencontainers.image.revision=$VCS_REF

RUN addgroup --system kairos && adduser --system --ingroup kairos kairos

WORKDIR /app

COPY --chown=kairos:kairos app.jar app.jar

USER kairos

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
