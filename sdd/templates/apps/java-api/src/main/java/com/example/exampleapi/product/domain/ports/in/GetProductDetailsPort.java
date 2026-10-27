package com.example.exampleapi.product.domain.ports.in;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.product.domain.models.Product;

public interface GetProductDetailsPort
{
    Product getProductDetails(Long id) throws ProductException;
}
