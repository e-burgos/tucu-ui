package com.example.exampleapi.product.domain.usecases;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.product.domain.models.Product;
import com.example.exampleapi.product.domain.ports.in.CreateProductPort;
import com.example.exampleapi.product.domain.ports.out.CreateProductProvider;

@Service
public class CreateProductUseCase implements CreateProductPort
{
    private static final BigDecimal MAX_PRICE = new BigDecimal("9999.99");

    private final CreateProductProvider createProductProvider;

    public CreateProductUseCase(CreateProductProvider createProductProvider)
    {
        this.createProductProvider = createProductProvider;
    }

    @Override
    public Product createProduct(String name, String category, BigDecimal price) throws ProductException
    {
        if (price.compareTo(MAX_PRICE) > 0)
        {
            throw new ProductException(ProductException.PRICE_EXCEEDED_MSG, ProductException.PRICE_EXCEEDED);
        }

        if (createProductProvider.existsByName(name))
        {
            throw new ProductException(ProductException.PRODUCT_ALREADY_EXISTS_MSG + ": " + name,
                    ProductException.PRODUCT_ALREADY_EXISTS);
        }

        return createProductProvider.save(Product.builder().name(name).category(category).price(price).build());
    }
}
