# Build stage
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/stayverse-backend-0.0.1-SNAPSHOT.jar app.jar

# Create data directory for SQLite persistence
RUN mkdir -p /data

EXPOSE 5000

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
