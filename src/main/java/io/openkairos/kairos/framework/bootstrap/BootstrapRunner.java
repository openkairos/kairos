package io.openkairos.kairos.framework.bootstrap;

import io.openkairos.kairos.bootstrap.superuser.SetupSuperUser;
import io.openkairos.kairos.bootstrap.superuser.SetupSuperUserCommand;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@EnableConfigurationProperties(SuperUserSettings.class)
public final class BootstrapRunner implements ApplicationRunner {
    private final SetupSuperUser setupSuperUser;
    private final SetupSuperUserCommand command;

    public BootstrapRunner(SetupSuperUser setupSuperUser, SuperUserSettings settings) {
        this.setupSuperUser = setupSuperUser;
        this.command = SetupSuperUserCommand.of(settings.username(), settings.password());
    }

    @Override
    public void run(@NonNull ApplicationArguments args) {
        setupSuperUser();
    }

    private void setupSuperUser() {
        boolean created = setupSuperUser.execute(command);

        if (!created || !command.passwordGenerated()) {
            return;
        }

        printGeneratedCredentials();
    }

    private void printGeneratedCredentials() {
        System.out.printf(
                "Initial super user credentials:%nUsername: %s%nPassword: %s%n",
                command.username(), command.password()
        );
    }
}
