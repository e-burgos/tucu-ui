package com.example.exampleapi.product.domain.ports.out;

import com.example.exampleapi.product.domain.models.Product;

public interface CreateProductProvider
{
    Product save(Product product);

    boolean existsByName(String name);
}
