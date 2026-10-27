package com.example.exampleapi.shared.config;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;

@Configuration
@EnableConfigurationProperties(ExternalApiProperties.class)
public class WebClientConfig
{
    @Value("${webclient.connection-pool.max-connections:50}")
    private int maxConnections;

    @Value("${webclient.connection-pool.max-idle-time:20}")
    private int maxIdleTime;

    @Value("${webclient.connection-pool.max-life-time:60}")
    private int maxLifeTime;

    @Bean
    public ConnectionProvider connectionProvider()
    {
        return ConnectionProvider.builder("external-api-pool").maxConnections(maxConnections)
                .maxIdleTime(Duration.ofSeconds(maxIdleTime)).maxLifeTime(Duration.ofSeconds(maxLifeTime)).build();
    }

    @Bean
    public Map<String, WebClient> externalWebClients(ExternalApiProperties properties,
            ConnectionProvider connectionProvider)
    {
        Map<String, WebClient> clients = new HashMap<>();

        properties.getApis().forEach((apiName, config) -> {
            HttpClient httpClient = HttpClient.create(connectionProvider)
                    .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, config.getConnectionTimeout())
                    .doOnConnected(conn -> conn
                            .addHandlerLast(new ReadTimeoutHandler(config.getReadTimeout(), TimeUnit.MILLISECONDS)));

            WebClient webClient = WebClient.builder().baseUrl(config.getBaseUrl())
                    .clientConnector(new ReactorClientHttpConnector(httpClient)).build();

            clients.put(apiName, webClient);
        });

        return clients;
    }
}
