package com.example.exampleapi.product.infrastructure.adapters.out;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.product.domain.models.Product;
import com.example.exampleapi.product.domain.ports.out.GetProductDetailsProvider;
import com.example.exampleapi.product.infrastructure.adapters.out.external.ProductDetailsResponse;
import com.example.exampleapi.shared.exception.ExternalServiceException;
import com.example.exampleapi.shared.infrastructure.web.ExternalApiClient;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductExternalAdapter implements GetProductDetailsProvider
{
    private static final String PRODUCTS_API = "products";

    private final ExternalApiClient externalApiClient;

    @Override
    public Product getProductDetails(Long id) throws ProductException
    {
        try
        {
            ProductDetailsResponse response = externalApiClient.get(PRODUCTS_API, "/products/" + id,
                    ProductDetailsResponse.class);

            if (response == null)
            {
                throw new ProductException(ProductException.PRODUCT_NOT_FOUND_MSG + ": " + id,
                        ProductException.PRODUCT_NOT_FOUND);
            }

            return toModel(response);
        }
        catch (ProductException e)
        {
            throw e;
        }
        catch (WebClientResponseException e)
        {
            throw new ExternalServiceException("External product service error for id: " + id, e);
        }
        catch (Exception e)
        {
            throw new ExternalServiceException("Unable to reach external product service for id: " + id, e);
        }
    }

    private Product toModel(ProductDetailsResponse response)
    {
        return Product.builder().id(response.getId()).name(response.getName()).category(response.getCategory())
                .price(response.getPrice()).description(response.getDescription()).build();
    }
}
