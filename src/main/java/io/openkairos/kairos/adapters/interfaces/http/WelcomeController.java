package io.openkairos.kairos.adapters.interfaces.http;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
final class WelcomeController {

    @GetMapping("/")
    String welcome() {
        return "Kairos: The right moment for customer data.";
    }
}
