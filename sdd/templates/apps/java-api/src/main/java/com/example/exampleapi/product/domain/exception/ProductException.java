package com.example.exampleapi.product.domain.exception;

import com.example.exampleapi.shared.exception.GenericException;

public class ProductException extends GenericException
{
    private static final long serialVersionUID = 1L;

    public static final String PRODUCT_NOT_FOUND = "PE01";
    public static final String PRODUCT_NOT_FOUND_MSG = "Product not found";

    public static final String PRODUCT_ALREADY_EXISTS = "PE02";
    public static final String PRODUCT_ALREADY_EXISTS_MSG = "Product already exists";

    public static final String PRICE_EXCEEDED = "PE03";
    public static final String PRICE_EXCEEDED_MSG = "Price exceeds the maximum allowed value";

    public ProductException(String message, String errorCode)
    {
        super(message, errorCode);
    }

    public ProductException(String message, String errorCode, Throwable cause)
    {
        super(message, errorCode, cause);
    }
}
