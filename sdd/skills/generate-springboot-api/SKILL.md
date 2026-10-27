---
name: generate-springboot-api
description: Genera una API o microservicio Spring Boot completo dentro del monorepo Nx (Maven, hexagonal, seguridad JWT, Flyway/Liquibase, tests). Fuente de verdad para scaffolding de backends Java nuevos.
---

# Skill: generate-springboot-api

> **Cuándo usar este skill:** Cuando se deba crear una nueva API o microservicio Spring Boot
> dentro de este monorepo. Este skill es la fuente de verdad para scaffolding
> de cualquier backend Java nuevo.

---

## Contexto y restricciones

- **Base de referencia:** `apps/example-api` — plantilla Spring Boot del monorepo.
  Está **prohibido** modificarla para aprender de ella; solo leerla como modelo.
- **NO usar `@nx/gradle`** — todos los proyectos Java usan Maven. El plugin Gradle fue removido del workspace.
- **Spring Cloud 2025.0.0** — es la única versión compatible con Spring Boot 3.5.x. No bajar a 2024.x.
- **Java 21 como `source/target`**, aunque la JVM local sea Java 26+.
- **Patrón de seguridad:** JWT HMAC-SHA256 via `NimbusJwtDecoder`. Las URLs de Swagger, actuator y
  las públicas del negocio se definen en `PUBLIC_URLS[]` dentro de `SecurityConfig.java`.

---

## Paso 1 — Decidir el nombre del servicio

Convención: `{dominio}-api` (kebab-case). Ejemplos:

- `inv-accounts-api`
- `inv-payments-api`
- `inv-notifications-api`

El nombre se usa como:

- Nombre de la carpeta: `apps/{SERVICE_NAME}/`
- `artifactId` en `pom.xml`
- `server.servlet.context-path` en `application.yml`
- `spring.application.name` en `application.yml`
- `name` en `project.json`

A partir de aquí se usa la variable `SERVICE_NAME` para referirse a ese valor.

El **groupId** siempre es `com.example` y el **package base** siempre es
`com.example.{SERVICE_NAME_CAMEL}` donde `SERVICE_NAME_CAMEL` es el nombre
en camelCase sin guiones (ej: `invaccountsapi`).

---

## Paso 2 — Estructura de directorios a crear

```
apps/{SERVICE_NAME}/
├── pom.xml
├── project.json
├── Dockerfile
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/example/{SERVICE_NAME_CAMEL}/
    │   │       ├── {ServiceNamePascal}Application.java   ← clase main
    │   │       ├── config/
    │   │       │   └── SecurityConfig.java
    │   │       └── controller/
    │   │           └── HealthController.java
    │   └── resources/
    │       ├── application.yml
    │       └── application-local.yml
    └── test/
        └── java/
            └── com/example/{SERVICE_NAME_CAMEL}/
                └── {ServiceNamePascal}ApplicationTests.java
```

El árbol de paquetes de dominio se expande después durante los ciclos SDD:

```
domain/
  model/
    entity/       ← @Entity JPA
    enums/        ← enums de dominio
  repository/     ← interfaces JPA Repository
service/          ← lógica de negocio (@Service)
controller/       ← @RestController
dto/              ← DTOs de request/response
exception/        ← excepciones custom + @ControllerAdvice
properties/       ← @ConfigurationProperties
```

---

## Paso 3 — `pom.xml`

Copiar la siguiente plantilla y reemplazar:

- `{SERVICE_NAME}` → nombre del servicio (kebab-case)
- `{SERVICE_DESCRIPTION}` → descripción breve
- `{SERVICE_NAME_CAMEL}` → nombre en camelCase sin guiones
- `{ServiceNamePascal}` → PascalCase para la clase main

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.0</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>{SERVICE_NAME}</artifactId>
    <version>0.1.0-SNAPSHOT</version>
    <name>{SERVICE_NAME}</name>
    <description>{SERVICE_DESCRIPTION} — {MONOREPO_NAME} monorepo</description>

    <properties>
        <java.version>21</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <start-class>com.example.{SERVICE_NAME_CAMEL}.{ServiceNamePascal}Application</start-class>

        <lombok.version>1.18.40</lombok.version>
        <mysql-connector-j.version>8.2.0</mysql-connector-j.version>
        <springdoc.version>2.6.0</springdoc.version>
        <modelmapper.version>3.1.1</modelmapper.version>
        <resilience4j.version>1.7.0</resilience4j.version>
        <vavr.version>0.10.4</vavr.version>
        <gson.version>2.10.1</gson.version>
        <jjwt.version>0.12.3</jjwt.version>
        <okhttp.mockwebserver.version>4.12.0</okhttp.mockwebserver.version>

        <jacoco.min.instruction.coverage>0.80</jacoco.min.instruction.coverage>
        <jacoco.min.branch.coverage>0.80</jacoco.min.branch.coverage>

        <sonar.coverage.exclusions>
            **/com/example/**/exception/**/*,
            **/com/example/**/config/**/*,
            **/com/example/**/properties/**/*,
            **/com/example/**/domain/model/enums/*,
            **/com/example/**/*Application.java
        </sonar.coverage.exclusions>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webflux</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>${mysql-connector-j.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.hsqldb</groupId>
            <artifactId>hsqldb</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.security</groupId>
                    <artifactId>spring-security-rsa</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>io.github.resilience4j</groupId>
            <artifactId>resilience4j-circuitbreaker</artifactId>
        </dependency>
        <dependency>
            <groupId>io.github.resilience4j</groupId>
            <artifactId>resilience4j-retry</artifactId>
        </dependency>
        <dependency>
            <groupId>io.github.resilience4j</groupId>
            <artifactId>resilience4j-bulkhead</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.modelmapper</groupId>
            <artifactId>modelmapper</artifactId>
            <version>${modelmapper.version}</version>
        </dependency>
        <dependency>
            <groupId>io.vavr</groupId>
            <artifactId>vavr</artifactId>
            <version>${vavr.version}</version>
        </dependency>
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>${gson.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>${springdoc.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>mockwebserver</artifactId>
            <version>${okhttp.mockwebserver.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <!-- CRÍTICO: Spring Cloud 2025.0.0 es la única versión compatible con Spring Boot 3.5.x -->
            <!-- NO usar 2024.0.x — solo soporta Spring Boot 3.4.x -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>2025.0.0</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-core</artifactId>
                <version>${resilience4j.version}</version>
            </dependency>
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-circuitbreaker</artifactId>
                <version>${resilience4j.version}</version>
            </dependency>
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-retry</artifactId>
                <version>${resilience4j.version}</version>
            </dependency>
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-bulkhead</artifactId>
                <version>${resilience4j.version}</version>
            </dependency>
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-ratelimiter</artifactId>
                <version>${resilience4j.version}</version>
            </dependency>
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-timelimiter</artifactId>
                <version>${resilience4j.version}</version>
            </dependency>
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-spring</artifactId>
                <version>${resilience4j.version}</version>
            </dependency>
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-spring-boot3</artifactId>
                <version>${resilience4j.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>false</filtering>
                <includes>
                    <include>**/*.*</include>
                </includes>
                <excludes>
                    <exclude>application.yml</exclude>
                    <exclude>Dockerfile</exclude>
                </excludes>
            </resource>
            <!-- application.yml con filtering=true para resolver @project.version@ -->
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
                <includes>
                    <include>application.yml</include>
                    <include>Dockerfile</include>
                </includes>
            </resource>
        </resources>

        <plugins>
            <!-- Lombok annotation processor — requerido explícitamente para Java 21+ -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>${lombok.version}</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-checkstyle-plugin</artifactId>
                <version>3.3.1</version>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <wait>1000</wait>
                    <maxAttempts>90</maxAttempts>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springdoc</groupId>
                <artifactId>springdoc-openapi-maven-plugin</artifactId>
                <version>1.0</version>
                <configuration>
                    <apiDocsUrl>http://localhost:8080/{SERVICE_NAME}/v3/api-docs</apiDocsUrl>
                    <outputFileName>${project.artifactId}-openapi.json</outputFileName>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.12</version>
                <configuration>
                    <includes>
                        <include>com/example/**/*.*</include>
                    </includes>
                    <excludes>
                        <exclude>com/example/**/exception/**/*</exclude>
                        <exclude>com/example/**/config/**/*</exclude>
                        <exclude>com/example/**/properties/**/*</exclude>
                        <exclude>com/example/**/domain/model/enums/*</exclude>
                        <exclude>com/example/**/*Application.class</exclude>
                    </excludes>
                </configuration>
                <executions>
                    <execution>
                        <id>prepare-agent</id>
                        <goals><goal>prepare-agent</goal></goals>
                    </execution>
                    <execution>
                        <id>report</id>
                        <goals><goal>report</goal></goals>
                    </execution>
                    <execution>
                        <id>check</id>
                        <goals><goal>check</goal></goals>
                        <configuration>
                            <rules>
                                <rule>
                                    <element>BUNDLE</element>
                                    <limits>
                                        <limit>
                                            <counter>INSTRUCTION</counter>
                                            <value>COVEREDRATIO</value>
                                            <minimum>${jacoco.min.instruction.coverage}</minimum>
                                        </limit>
                                        <limit>
                                            <counter>BRANCH</counter>
                                            <value>COVEREDRATIO</value>
                                            <minimum>${jacoco.min.branch.coverage}</minimum>
                                        </limit>
                                    </limits>
                                </rule>
                            </rules>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

    <repositories>
        <repository>
            <id>nexus-internal</id>
            <url>https://nexus.example.com/repository/maven-public/</url>
            <releases><enabled>true</enabled></releases>
            <snapshots><enabled>false</enabled></snapshots>
        </repository>
    </repositories>
    <pluginRepositories>
        <pluginRepository>
            <id>nexus-internal-plugins</id>
            <url>https://nexus.example.com/repository/maven-public/</url>
        </pluginRepository>
    </pluginRepositories>
</project>
```

---

## Paso 4 — `project.json` (Nx targets)

```json
{
  "name": "{SERVICE_NAME}",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "projectType": "application",
  "tags": ["scope:api", "type:app", "lang:java"],
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "mvn package -DskipTests",
        "cwd": "apps/{SERVICE_NAME}"
      },
      "inputs": ["{projectRoot}/src/**/*", "{projectRoot}/pom.xml"],
      "outputs": ["{projectRoot}/target"]
    },
    "test": {
      "executor": "nx:run-commands",
      "options": {
        "command": "mvn test",
        "cwd": "apps/{SERVICE_NAME}"
      },
      "inputs": ["{projectRoot}/src/**/*", "{projectRoot}/pom.xml"],
      "outputs": [
        "{projectRoot}/target/surefire-reports",
        "{projectRoot}/target/jacoco.exec"
      ]
    },
    "serve": {
      "executor": "nx:run-commands",
      "options": {
        "command": "mvn spring-boot:run -Dspring-boot.run.arguments=\"--spring.profiles.active=local\"",
        "cwd": "apps/{SERVICE_NAME}"
      }
    },
    "lint": {
      "executor": "nx:run-commands",
      "options": {
        "command": "mvn checkstyle:check",
        "cwd": "apps/{SERVICE_NAME}"
      },
      "inputs": ["{projectRoot}/src/**/*.java", "{projectRoot}/pom.xml"]
    },
    "coverage": {
      "executor": "nx:run-commands",
      "options": {
        "command": "mvn verify",
        "cwd": "apps/{SERVICE_NAME}"
      },
      "outputs": ["{projectRoot}/target/site/jacoco"]
    }
  }
}
```

---

## Paso 5 — `src/main/resources/application.yml`

> ⚠️ `@project.version@` debe ir **entre comillas dobles** en YAML para evitar error de parseo.

```yaml
project:
  version: '@project.version@'

server:
  servlet:
    context-path: '/{SERVICE_NAME}'
  shutdown: graceful
  error:
    include-message: always

spring:
  application:
    name: { SERVICE_NAME }
  config:
    # Config Server desactivado por defecto en local
    # En producción: CONFIG_SERVER_ENABLED=true, CONFIG_SERVER_ADDR=http://config-server:8081
    import: optional:configserver:${CONFIG_SERVER_ADDR:http://localhost:8081}/config
  cloud:
    config:
      enabled: ${CONFIG_SERVER_ENABLED:false}
      fail-fast: true
      retry:
        max-attempts: 20
        max-interval: 15000
        initial-interval: 10000
    bus:
      enabled: ${REFRESH_ENABLED:false}
  jackson:
    serialization:
      write-dates-as-timestamps: false
  lifecycle:
    timeout-per-shutdown-phase: ${GRACEFUL_SHUTDOWN_TIMEOUT:60s}
  jpa:
    open-in-view: false

management:
  endpoints:
    web:
      exposure:
        include: '*'
  endpoint:
    health:
      show-details: always
      probes:
        enabled: true
  health:
    redis:
      enabled: false

# Idempotencia vía Redis
parameter:
  idempotency:
    redis:
      host: ${REDIS_SERVER:localhost}
      port: ${REDIS_PORT:6379}
      use-ssl: ${REDIS_SSL:false}
      password: ${REDIS_PASSWORD:}
    ttl-seconds: ${REDIS_TTL_SECONDS:60}
    microservice-name: { SERVICE_NAME }

# OpenAPI / Swagger UI
springdoc:
  writer-with-order-by-keys: true
  api-docs:
    resolve-schema-properties: true
    path: /v3/api-docs
    enabled: true
  swagger-ui:
    operations-sorter: 'method'
    tags-sorter: 'alpha'
    disable-swagger-default-url: true
    showExtensions: true
    path: /swagger-ui.html
    enabled: true

# APIs externas — agregar según necesidad del servicio
# external-apis:
#   example-api:
#     base-url: ${EXAMPLE_API_URL:http://localhost:8090/example-api}
#     connection-timeout: ${EXAMPLE_API_CONNECTION_TIMEOUT:5000}
#     read-timeout: ${EXAMPLE_API_READ_TIMEOUT:10000}
#     max-retries: ${EXAMPLE_API_MAX_RETRIES:3}
#     retry-delay: ${EXAMPLE_API_RETRY_DELAY:1000}
```

---

## Paso 6 — `src/main/resources/application-local.yml`

```yaml
spring:
  application:
    name: { SERVICE_NAME }

  # Base de datos en memoria para desarrollo local y tests
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: false
    properties:
      hibernate:
        format_sql: true
    defer-datasource-initialization: true
  datasource:
    url: jdbc:hsqldb:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=false
    driver-class-name: org.hsqldb.jdbcDriver
    username: sa
    password: ''
    hikari:
      maximum-pool-size: 5
      minimum-idle: 2

  # Redis local (puede estar offline — health check desactivado arriba)
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
    password: ${REDIS_PASSWORD:}
    timeout: ${REDIS_TIMEOUT:2000}

# Clave JWT local — en producción viene de variables de entorno o Config Server
TOKEN_SIGNER_KEY: 'ChangeMeLocalDevKey0123456789012345678901'

logging:
  level:
    root: INFO
    com.example: DEBUG
    org.springframework.web: DEBUG
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
```

---

## Paso 7 — Clases Java base

### `{ServiceNamePascal}Application.java`

```java
package com.example.{SERVICE_NAME_CAMEL};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class {ServiceNamePascal}Application {

    public static void main(String[] args) {
        SpringApplication.run({ServiceNamePascal}Application.class, args);
    }
}
```

### `config/SecurityConfig.java`

> ⚠️ Este archivo es **obligatorio**. Sin él, Spring Security bloquea todos los endpoints
> incluyendo Swagger y actuator (redirige a `/login`).

```java
package com.example.{SERVICE_NAME_CAMEL}.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // URLs que no requieren autenticación
    // Agregar aquí los endpoints públicos del negocio (ej: "/auth/**", "/public/**")
    private static final String[] PUBLIC_URLS = {
        "/actuator/**",
        "/health",
        "/info",
        "/swagger-ui/**",
        "/swagger-ui.html",
        "/v3/api-docs/**",
        "/webjars/**"
    };

    @Value("${TOKEN_SIGNER_KEY}")
    private String tokenSignerKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(PUBLIC_URLS).permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())));

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        byte[] keyBytes = tokenSignerKey.getBytes(StandardCharsets.UTF_8);
        SecretKey secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
        return NimbusJwtDecoder.withSecretKey(secretKey).build();
    }
}
```

### `controller/HealthController.java`

```java
package com.example.{SERVICE_NAME_CAMEL}.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "ok",
            "timestamp", Instant.now().toString()
        ));
    }
}
```

### `{ServiceNamePascal}ApplicationTests.java`

```java
package com.example.{SERVICE_NAME_CAMEL};

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("local")
class {ServiceNamePascal}ApplicationTests {

    @Test
    void contextLoads() {
    }
}
```

---

## Paso 8 — `Dockerfile`

```dockerfile
# Etapa 1: construcción con Maven
FROM amazoncorretto:21-alpine3.20 AS builder
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B --no-transfer-progress || true

COPY src ./src
RUN mvn package -DskipTests -B --no-transfer-progress

# Etapa 2: imagen de ejecución mínima
FROM amazoncorretto:21-alpine3.20
WORKDIR /app

COPY --from=builder /app/target/{SERVICE_NAME}-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## Paso 9 — Verificación post-scaffolding

Ejecutar en orden:

```bash
# 1. Compilar sin tests
pnpm nx build {SERVICE_NAME}

# 2. Levantar en local
pnpm nx serve {SERVICE_NAME}

# 3. Verificar que el Swagger es accesible (sin autenticación)
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/{SERVICE_NAME}/swagger-ui.html
# Debe retornar 200

# 4. Verificar health endpoint
curl http://localhost:8080/{SERVICE_NAME}/api/v1/health
# Debe retornar {"status":"ok","timestamp":"..."}
```

---

## Errores conocidos y soluciones

| Error                                                       | Causa                                                   | Solución                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `Port 8080 was already in use`                              | Instancia anterior no terminada                         | `lsof -ti:8080 \| xargs kill -9`                                                   |
| `Web server failed to start. Port 8080 was already in use`  | Igual que arriba                                        | Igual que arriba                                                                   |
| `No qualifying bean of type 'JwtDecoder'`                   | Falta `SecurityConfig.java` con el `@Bean jwtDecoder()` | Crear `SecurityConfig.java` del Paso 7                                             |
| `Plain value cannot start with reserved character @`        | `@project.version@` sin comillas en YAML                | Envolverlo en comillas dobles: `"@project.version@"`                               |
| `Spring Cloud 2024.0.x incompatible with Spring Boot 3.5.x` | BOM desactualizado                                      | Usar `spring-cloud-dependencies:2025.0.0` en `dependencyManagement`                |
| `Failed to start bean 'webServerStartStop'` (genérico)      | Ver causa raíz en el log más abajo                      | Buscar la línea `Caused by:` en el log completo                                    |
| `HSQLDialect does not need to be specified explicitly`      | Dialect explícito redundante                            | Eliminar `hibernate.dialect` de `application-local.yml`; Hibernate lo auto-detecta |
| `spring.jpa.open-in-view is enabled by default`             | Warning de rendimiento                                  | Agregar `spring.jpa.open-in-view: false` en `application.yml`                      |
| Swagger redirige a `/login`                                 | Spring Security sin `SecurityFilterChain` configurado   | Crear `SecurityConfig.java` obligatoriamente                                       |

---

## Puertos por servicio

Para evitar conflictos al correr múltiples servicios en local, asignar puertos distintos
en `application-local.yml` de cada servicio:

```yaml
server:
  port: 808X # ← diferente por servicio
```

| Servicio           | Puerto local |
| ------------------ | ------------ |
| `example-api`      | 8195         |
| Próximo servicio   | 8081         |
| Siguiente servicio | 8082         |

> Documentar el puerto asignado en `sdd/context/constitution.md` al crear cada nuevo servicio.

---

## Convenciones de código

- **Comentarios** en español
- **Código y nombres de clases/métodos/variables** en inglés (Java conventions)
- **Logs** en inglés (Spring Boot standard)
- **Cobertura mínima:** 80% instrucciones y 80% branches (JaCoCo)
- **Lombok** para reducir boilerplate en entidades y DTOs (`@Data`, `@Builder`, `@NoArgsConstructor`, etc.)
- **`@ConfigurationProperties`** para grupos de configuración, nunca `@Value` individual en servicios
- **DTOs** separados de entidades JPA — nunca exponer entidades directamente en controllers
