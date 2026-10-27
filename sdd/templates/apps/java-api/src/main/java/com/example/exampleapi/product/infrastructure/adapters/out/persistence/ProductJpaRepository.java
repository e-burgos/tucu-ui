package com.example.exampleapi.product.infrastructure.adapters.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductJpaRepository extends JpaRepository<ProductEntity, Long>
{
    boolean existsByName(String name);
}
