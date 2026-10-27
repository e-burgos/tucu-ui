package com.example.exampleapi.shared.handler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.shared.exception.ExternalServiceException;
import com.example.exampleapi.shared.web.ApiError;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice(basePackages = "com.example.exampleapi")
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler
{
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request)
    {
        StringBuilder message = new StringBuilder();
        for (FieldError error : ex.getBindingResult().getFieldErrors())
        {
            if (message.length() > 0)
            {
                message.append(", ");
            }
            message.append(error.getField()).append(": ").append(error.getDefaultMessage());
        }
        return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST, "VALIDATION_ERROR", message.toString()),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ApiError> handleProductException(ProductException ex)
    {
        HttpStatus status = switch (ex.getErrorCode())
        {
            case ProductException.PRODUCT_NOT_FOUND -> HttpStatus.NOT_FOUND;
            case ProductException.PRODUCT_ALREADY_EXISTS -> HttpStatus.CONFLICT;
            case ProductException.PRICE_EXCEEDED -> HttpStatus.UNPROCESSABLE_ENTITY;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };
        return new ResponseEntity<>(new ApiError(status, ex.getErrorCode(), ex.getMessage()), status);
    }

    @ExceptionHandler(ExternalServiceException.class)
    public ResponseEntity<ApiError> handleExternalService(ExternalServiceException ex)
    {
        return new ResponseEntity<>(
                new ApiError(HttpStatus.SERVICE_UNAVAILABLE, "EXTERNAL_SERVICE_ERROR", ex.getMessage(), ex),
                HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneral(Exception ex)
    {
        log.error("Unhandled exception: {}", ex.getMessage(), ex);
        return new ResponseEntity<>(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
