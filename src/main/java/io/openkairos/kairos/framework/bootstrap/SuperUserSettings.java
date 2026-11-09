package io.openkairos.kairos.framework.bootstrap;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

@ConfigurationProperties("kairos.superuser")
public record SuperUserSettings(@DefaultValue("kairos") String username, String password) {
}
