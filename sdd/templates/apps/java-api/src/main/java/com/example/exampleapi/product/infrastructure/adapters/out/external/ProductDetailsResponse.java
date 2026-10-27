package com.example.exampleapi.product.infrastructure.adapters.out.external;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductDetailsResponse
{
    private Long id;
    private String name;
    private String category;
    private BigDecimal price;
    private String description;
}
