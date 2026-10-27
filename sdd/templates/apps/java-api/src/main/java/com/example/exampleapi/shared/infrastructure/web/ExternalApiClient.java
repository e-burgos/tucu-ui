package com.example.exampleapi.shared.infrastructure.web;

import java.time.Duration;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExternalApiClient
{
    private final Map<String, WebClient> externalWebClients;

    public <T> T get(String apiName, String path, Class<T> responseType)
    {
        WebClient webClient = getWebClient(apiName);
        log.debug("GET request to {} - path: {}", apiName, path);

        return webClient.get().uri(path).retrieve()
                .onStatus(status -> status.equals(HttpStatus.NOT_FOUND), response -> {
                    log.warn("Resource not found - api: {}, path: {}", apiName, path);
                    return Mono.empty();
                }).onStatus(HttpStatusCode::isError, response -> {
                    log.error("Error response from {} - status: {}, path: {}", apiName, response.statusCode(), path);
                    return response.createException().flatMap(Mono::error);
                }).bodyToMono(responseType).retryWhen(buildRetry(apiName)).block();
    }

    public <T> T getWithHeaders(String apiName, String path, Map<String, String> headers, Class<T> responseType)
    {
        WebClient webClient = getWebClient(apiName);
        log.debug("GET request with headers to {} - path: {}", apiName, path);

        return webClient.get().uri(path).headers(httpHeaders -> headers.forEach(httpHeaders::add)).retrieve()
                .onStatus(status -> status.equals(HttpStatus.NOT_FOUND), response -> {
                    log.warn("Resource not found - api: {}, path: {}", apiName, path);
                    return Mono.empty();
                }).onStatus(HttpStatusCode::isError, response -> {
                    log.error("Error response from {} - status: {}, path: {}", apiName, response.statusCode(), path);
                    return response.createException().flatMap(Mono::error);
                }).bodyToMono(responseType).retryWhen(buildRetry(apiName)).block();
    }

    public <T, R> R post(String apiName, String path, T requestBody, Class<R> responseType)
    {
        WebClient webClient = getWebClient(apiName);
        log.debug("POST request to {} - path: {}", apiName, path);

        return webClient.post().uri(path).bodyValue(requestBody).retrieve()
                .onStatus(HttpStatusCode::isError, response -> {
                    log.error("Error response from {} - status: {}, path: {}", apiName, response.statusCode(), path);
                    return response.createException().flatMap(Mono::error);
                }).bodyToMono(responseType).retryWhen(buildRetry(apiName)).block();
    }

    public <T, R> R postWithHeaders(String apiName, String path, T requestBody, Map<String, String> headers,
            Class<R> responseType)
    {
        WebClient webClient = getWebClient(apiName);
        log.debug("POST request with headers to {} - path: {}", apiName, path);

        return webClient.post().uri(path).headers(h -> headers.forEach(h::set)).bodyValue(requestBody).retrieve()
                .onStatus(HttpStatusCode::isError, response -> {
                    log.error("Error response from {} - status: {}, path: {}", apiName, response.statusCode(), path);
                    return response.createException().flatMap(Mono::error);
                }).bodyToMono(responseType).retryWhen(buildRetry(apiName)).block();
    }

    public <T, R> R patchWithHeaders(String apiName, String path, T requestBody, Map<String, String> headers,
            Class<R> responseType)
    {
        WebClient webClient = getWebClient(apiName);
        log.debug("PATCH request to {} - path: {}", apiName, path);

        return webClient.patch().uri(path).headers(h -> headers.forEach(h::set)).bodyValue(requestBody).retrieve()
                .onStatus(HttpStatusCode::isError, response -> {
                    log.error("Error response from {} - status: {}, path: {}", apiName, response.statusCode(), path);
                    return response.createException().flatMap(Mono::error);
                }).bodyToMono(responseType).retryWhen(buildRetry(apiName)).block();
    }

    private Retry buildRetry(String target)
    {
        return Retry.backoff(3, Duration.ofSeconds(1)).maxBackoff(Duration.ofSeconds(10)).filter(throwable -> {
            if (throwable instanceof WebClientResponseException ex)
            {
                if (ex.getStatusCode().value() == 401 || ex.getStatusCode().value() == 403)
                {
                    return false;
                }
                return ex.getStatusCode().is5xxServerError();
            }
            return true;
        }).doBeforeRetry(signal -> {
            String reason = signal.failure() instanceof WebClientResponseException ex
                    ? "status " + ex.getStatusCode().value()
                    : signal.failure().getMessage();
            log.warn("Retrying request to {} - attempt: {}, reason: {}", target, signal.totalRetries() + 1, reason);
        });
    }

    private WebClient getWebClient(String apiName)
    {
        WebClient webClient = externalWebClients.get(apiName);
        if (webClient == null)
        {
            throw new IllegalArgumentException("WebClient not configured for API: " + apiName);
        }
        return webClient;
    }
}
