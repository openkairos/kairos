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

## Code formatting

Check that Java sources follow the project formatting rules:

```bash
./mvnw spotless:check
```

Apply the formatting rules:

```bash
./mvnw spotless:apply
```
