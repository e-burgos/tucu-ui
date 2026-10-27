package com.example.exampleapi.product.domain.models;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Product
{
    private Long id;
    private String name;
    private String category;
    private BigDecimal price;
    private String description;
}
