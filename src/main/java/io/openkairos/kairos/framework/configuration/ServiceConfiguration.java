package io.openkairos.kairos.framework.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration(proxyBeanMethods = false)
@ImportResource("classpath:services.xml")
public final class ServiceConfiguration {
}
