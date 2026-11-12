# Kairos

Kairos is a customer data engine designed to collect, unify, and process customer data in real-time.

## Philosophy

The name Kairos comes from the Greek concept of "the right moment". Kairos helps teams capture the exact moment when
data becomes valuable and actionable.

## Testing

Start MongoDB for tests:

```bash
docker compose up -d mongodb
```

Run the test suite:

```bash
./mvnw test
```

Show Spring and MongoDB driver information while running tests:

```bash
./mvnw -Ptest-info test
```

Debug the MongoDB driver while retaining normal application information:

```bash
./mvnw -Ptest-debug test
```

Set `KAIROS_TEST_MONGODB_URI` to use a different MongoDB server or database. The default is
`mongodb://localhost:27017/kairos_test`.

## Local development

Start MongoDB explicitly before launching the application from IntelliJ IDEA:

```bash
docker compose up -d mongodb
```

Then run `KairosApplication` with IntelliJ IDEA's Play button. The application connects to MongoDB at
`mongodb://localhost:27017/kairos` by default. Set `KAIROS_MONGODB_URI` to use a different MongoDB instance.

## Container image

Build the executable JAR and package those same bytes into a local image:

```bash
make image
```

Run it by providing a MongoDB URI reachable from inside the container and a signing secret:

```bash
docker run --rm -p 8080:8080 \
  -e KAIROS_MONGODB_URI='mongodb://<mongodb-host>:27017/kairos' \
  -e KAIROS_JWT_SIGNING_SECRET='<local-signing-secret>' \
  kairos:local
```

The Compose file intentionally runs MongoDB only; it supports the IntelliJ-first development workflow rather than
running Kairos in a container.

To build a JAR for a specific release version, pass the version to Make:

```bash
make jar VERSION=0.1.0
```

Published semantic-version releases attach that JAR to the GitHub Release and publish matching GHCR image tags. A
manual publishing run creates only the mutable `test` image tag for its selected revision.

## Code formatting

Check that Java sources follow the project formatting rules:

```bash
./mvnw spotless:check
```

Apply the formatting rules:

```bash
./mvnw spotless:apply
```

## Static analysis

Run strict static analysis after compiling production code:

```bash
./mvnw compile spotbugs:check
```
