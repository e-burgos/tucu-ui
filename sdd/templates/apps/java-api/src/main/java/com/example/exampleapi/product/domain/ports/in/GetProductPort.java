package com.example.exampleapi.product.domain.ports.in;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.product.domain.models.Product;

public interface GetProductPort
{
    Product getProduct(Long id) throws ProductException;
}
