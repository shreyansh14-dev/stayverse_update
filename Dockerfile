# Stage 1: Build the React Frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Java Backend
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY pom.xml .
# Pre-fetch dependencies to speed up subsequent builds
RUN mvn dependency:go-offline
COPY src ./src
# Copy the built frontend into the static resources of the Java app
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# Stage 3: Run the Application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=backend-build /app/target/stayverse-backend-0.0.1-SNAPSHOT.jar app.jar
# Create data folder for SQLite persistence
RUN mkdir -p /data
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
