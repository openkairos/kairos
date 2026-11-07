package io.openkairos.kairos.testing.mongo;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.mongodb.MongoDBContainer;

@TestConfiguration(proxyBeanMethods = false)
class MongoTestConfiguration {

    @Bean
    @ServiceConnection
    MongoDBContainer testMongoContainer() {
        return new MongoDBContainer("mongo:9.0.4");
    }
}
