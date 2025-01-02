package org.example.itqaassitgnment.utils;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.springframework.stereotype.Component;

@Component
public class APIHelper {

    // Method to send a POST request with Basic Authentication
    public Response sendPostRequestWithBasicAuth(String endpoint, String requestBody, String username, String password) {
        return RestAssured.given()
                .auth().basic(username, password) // Add Basic Auth header
                .header("Content-Type", "application/json") // Set Content-Type
                .body(requestBody) // Add request body
                .post(endpoint);
    }

    public Response sendPutRequestWithBasicAuth(String endpoint, String requestBody, String username, String password) {
        return RestAssured.given()
                .auth().basic(username, password)
                .header("Content-Type", "application/json")
                .body(requestBody)
                .put(endpoint);
    }

    public Response sendDeleteRequestWithBasicAuth(String endpoint, String username, String password) {
        return RestAssured.given()
                .auth().basic(username, password)
                .header("Content-Type", "application/json")
                .delete(endpoint);
    }

    public Response sendGetRequestWithBasicAuth(String endpoint, String username, String password) {
        return RestAssured.given()
                .auth().basic(username, password)
                .header("Content-Type", "application/json")
                .get(endpoint);
    }

}