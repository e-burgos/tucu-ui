# Etapa 1: construcción con Maven + JDK 21
FROM maven:3.9-amazoncorretto-21 AS builder
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B --no-transfer-progress || true

COPY src ./src
RUN mvn package -DskipTests -B --no-transfer-progress

# Etapa 2: imagen de ejecución mínima
FROM amazoncorretto:21-alpine3.20
WORKDIR /app

COPY --from=builder /app/target/example-api-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
