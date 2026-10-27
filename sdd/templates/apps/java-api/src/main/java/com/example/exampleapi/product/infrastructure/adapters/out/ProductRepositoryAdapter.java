package com.example.exampleapi.product.infrastructure.adapters.out;

import org.springframework.stereotype.Component;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.product.domain.models.Product;
import com.example.exampleapi.product.domain.ports.out.CreateProductProvider;
import com.example.exampleapi.product.domain.ports.out.GetProductProvider;
import com.example.exampleapi.product.infrastructure.adapters.out.persistence.ProductEntity;
import com.example.exampleapi.product.infrastructure.adapters.out.persistence.ProductJpaRepository;

@Component
public class ProductRepositoryAdapter implements GetProductProvider, CreateProductProvider
{
    private final ProductJpaRepository productJpaRepository;

    public ProductRepositoryAdapter(ProductJpaRepository productJpaRepository)
    {
        this.productJpaRepository = productJpaRepository;
    }

    @Override
    public Product getProduct(Long id) throws ProductException
    {
        return productJpaRepository.findById(id).map(this::toModel)
                .orElseThrow(() -> new ProductException(ProductException.PRODUCT_NOT_FOUND_MSG + ": " + id,
                        ProductException.PRODUCT_NOT_FOUND));
    }

    @Override
    public Product save(Product product)
    {
        ProductEntity entity = ProductEntity.builder().name(product.getName()).category(product.getCategory())
                .price(product.getPrice()).build();
        return toModel(productJpaRepository.save(entity));
    }

    @Override
    public boolean existsByName(String name)
    {
        return productJpaRepository.existsByName(name);
    }

    private Product toModel(ProductEntity entity)
    {
        return Product.builder().id(entity.getId()).name(entity.getName()).category(entity.getCategory())
                .price(entity.getPrice()).build();
    }
}
