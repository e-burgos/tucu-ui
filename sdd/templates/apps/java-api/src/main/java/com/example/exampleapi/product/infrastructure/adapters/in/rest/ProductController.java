package com.example.exampleapi.product.infrastructure.adapters.in.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exampleapi.product.domain.exception.ProductException;
import com.example.exampleapi.product.domain.ports.in.CreateProductPort;
import com.example.exampleapi.product.domain.ports.in.GetProductDetailsPort;
import com.example.exampleapi.product.domain.ports.in.GetProductPort;
import com.example.exampleapi.product.infrastructure.adapters.in.rest.request.CreateProductRequest;
import com.example.exampleapi.product.infrastructure.adapters.in.rest.response.ProductResponse;
import com.example.exampleapi.shared.web.ApiError;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Product Controller")
public class ProductController
{
    private final GetProductPort getProductPort;
    private final GetProductDetailsPort getProductDetailsPort;
    private final CreateProductPort createProductPort;

    public ProductController(GetProductPort getProductPort, GetProductDetailsPort getProductDetailsPort,
            CreateProductPort createProductPort)
    {
        this.getProductPort = getProductPort;
        this.getProductDetailsPort = getProductDetailsPort;
        this.createProductPort = createProductPort;
    }

    @Operation(summary = "Get product by id — queries the database", operationId = "getProduct")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ProductResponse.class))),
            @ApiResponse(responseCode = "404", description = "Product not found",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))) })
    @GetMapping(path = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) throws ProductException
    {
        return new ResponseEntity<>(ProductResponse.from(getProductPort.getProduct(id)), HttpStatus.OK);
    }

    @Operation(summary = "Get product details by id — queries an external system", operationId = "getProductDetails")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product details found",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ProductResponse.class))),
            @ApiResponse(responseCode = "404", description = "Product not found",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "503", description = "External service unavailable",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))) })
    @GetMapping(path = "/{id}/details", produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<ProductResponse> getProductDetails(@PathVariable Long id) throws ProductException
    {
        return new ResponseEntity<>(ProductResponse.from(getProductDetailsPort.getProductDetails(id)), HttpStatus.OK);
    }

    @Operation(summary = "Create a new product", operationId = "createProduct")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ProductResponse.class))),
            @ApiResponse(responseCode = "400", description = "Validation error",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "Product already exists",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "422", description = "Price exceeds maximum allowed value",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ApiError.class))) })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody CreateProductRequest request)
            throws ProductException
    {
        return new ResponseEntity<>(
                ProductResponse.from(
                        createProductPort.createProduct(request.getName(), request.getCategory(), request.getPrice())),
                HttpStatus.CREATED);
    }
}
