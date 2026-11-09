package io.openkairos.kairos.adapters.framework.logger;

import io.openkairos.kairos.kernel.logger.LoggerInterface;
import org.slf4j.Logger;

public final class Slf4jLogger implements LoggerInterface {

    private final Logger logger;

    public Slf4jLogger(Logger logger) {
        this.logger = logger;
    }

    @Override
    public void info(String message) {
        logger.info(message);
    }
}
