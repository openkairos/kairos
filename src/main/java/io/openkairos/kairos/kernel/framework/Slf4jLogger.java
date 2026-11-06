package io.openkairos.kairos.kernel.framework;

import io.openkairos.kairos.kernel.LoggerInterface;
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
