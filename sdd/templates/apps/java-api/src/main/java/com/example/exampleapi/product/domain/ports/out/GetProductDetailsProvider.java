package com.example.exampleapi.product.domain.ports.out;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.product.domain.models.Product;

public interface GetProductDetailsProvider
{
    Product getProductDetails(Long id) throws ProductException;
}
