package com.example.exampleapi.shared.web;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiError
{
    @JsonProperty
    private HttpStatus status;

    @JsonProperty
    private LocalDateTime timestamp;

    @JsonProperty
    private String code;

    @JsonProperty
    private String message;

    @JsonProperty
    private String debugMessage;

    private ApiError()
    {
        this.timestamp = LocalDateTime.now();
    }

    public ApiError(HttpStatus status)
    {
        this();
        this.status = status;
    }

    public ApiError(HttpStatus status, Throwable ex)
    {
        this();
        this.status = status;
        this.message = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }

    public ApiError(HttpStatus status, String code, String message)
    {
        this();
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public ApiError(HttpStatus status, String code, String message, Throwable ex)
    {
        this();
        this.status = status;
        this.code = code;
        this.message = message;
        this.debugMessage = ex.getMessage();
    }
}
