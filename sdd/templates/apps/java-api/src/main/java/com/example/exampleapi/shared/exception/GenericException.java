package com.example.exampleapi.shared.exception;

public abstract class GenericException extends Exception
{
    private static final long serialVersionUID = 1L;

    private final String errorCode;

    public GenericException(String message, String errorCode)
    {
        super(message);
        this.errorCode = errorCode;
    }

    public GenericException(String message, String errorCode, Throwable cause)
    {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public String getErrorCode()
    {
        return errorCode;
    }
}
