FROM openjdk:21-jdk AS build
WORKDIR /app
COPY . /app
RUN microdnf install -y findutils
RUN chmod +x gradlew
RUN ./gradlew bootJar

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar ./
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
