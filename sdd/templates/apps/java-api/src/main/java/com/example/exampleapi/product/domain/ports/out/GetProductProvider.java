package com.example.exampleapi.product.domain.ports.out;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.product.domain.models.Product;

public interface GetProductProvider
{
    Product getProduct(Long id) throws ProductException;
}
