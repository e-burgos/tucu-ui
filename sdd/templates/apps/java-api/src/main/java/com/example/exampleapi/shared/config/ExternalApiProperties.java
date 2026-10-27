package com.example.exampleapi.shared.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "external-apis")
public class ExternalApiProperties
{
    private Map<String, ApiConfig> apis = new HashMap<>();

    @Getter
    @Setter
    public static class ApiConfig
    {
        private String baseUrl;
        private int connectionTimeout = 5000;
        private int readTimeout = 30000;
        private int maxRetries = 3;
        private int retryDelay = 1000;
    }
}
