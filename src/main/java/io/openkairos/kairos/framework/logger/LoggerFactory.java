package io.openkairos.kairos.framework.logger;

import io.openkairos.kairos.kernel.logger.LoggerInterface;
import org.springframework.beans.factory.InjectionPoint;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration(proxyBeanMethods = false)
public final class LoggerFactory {

    @Bean("logger")
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    LoggerInterface create(InjectionPoint injectionPoint) {
        return new Slf4jLogger(org.slf4j.LoggerFactory.getLogger(injectionPoint.getMember().getDeclaringClass()));
    }
}
