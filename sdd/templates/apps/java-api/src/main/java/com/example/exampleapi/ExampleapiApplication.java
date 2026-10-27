package com.example.exampleapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Example API application entry point.
 * Configures Spring Boot with default settings and enables auto-configuration.
 */
@SpringBootApplication
public final class ExampleapiApplication {

    /**
     * Private constructor to prevent instantiation of utility class.
     */
    private ExampleapiApplication() {
        // Utility class - private constructor
    }

    /**
     * Main entry point for the Example API application.
     *
     * @param args command line arguments passed to the application
     */
    public static void main(final String[] args) {
        SpringApplication.run(ExampleapiApplication.class, args);
    }
}
