package org.example.itqaassitgnment.stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.Assert;

public class BookDeleteStepDefinitions {

    private Response response;
    private RequestSpecification request;
    private String endpoint;
    private String username;
    private String password;
    private int bookId; // Declare bookId as a class-level variable to use it across steps

    @Given("API endpoint is {string}")
    public void theApiEndpointIs(String apiEndpoint) {
        this.endpoint = apiEndpoint;
        RestAssured.baseURI = "http://localhost:8080"; // Ensure base URI is configurable.
        System.out.println("Base URI set to: " + RestAssured.baseURI);
    }

    @Given("Basic Authentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIsAndPasswordIs(String username, String password) {
        this.username = username;
        this.password = password;

        // Initialize request with authentication and content type.
        this.request = RestAssured.given()
                .auth()
                .basic(username, password)
                .contentType("application/json");

        System.out.println("Request initialized with username: " + username);
    }

    @When("I send a DELETE request with the ID {int}")
    public void iSendADeleteRequestWithTheID(int bookId) {
        this.bookId = bookId; // Store bookId in the class variable

        Assert.assertNotNull("Request object is not initialized. Ensure authentication step is executed.", request);

        String finalEndpoint = endpoint.replace("{id}", String.valueOf(bookId));
        System.out.println("Sending DELETE request to endpoint: " + finalEndpoint);

        response = request.when().delete(finalEndpoint);

        // Log response details for debugging.
        System.out.println("Response Status Code: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody().asString());
    }

    @Then("the response status should be {int}")
    public void theResponseStatusShouldBe(int expectedStatusCode) {
        Assert.assertNotNull("Response is null. Ensure DELETE request was executed.", response);

        int actualStatusCode = response.getStatusCode();
        System.out.println("Validating response status code. Expected: " + expectedStatusCode + ", Actual: " + actualStatusCode);

        Assert.assertEquals("Unexpected status code.", expectedStatusCode, actualStatusCode);
    }

    @Then("the response should contain:")
    public void theResponseShouldContain(String expectedBody) {
        Assert.assertNotNull("Response is null. Ensure DELETE request was executed.", response);

        String actualBody = response.getBody().asString();
        System.out.println("Validating response body. Expected to contain: " + expectedBody.trim());

        Assert.assertTrue("Response body does not match expected content.",
                actualBody.contains(expectedBody.trim()));
    }

    @Then("the deleted book should no longer exist in the database")
    public void theDeletedBookShouldNoLongerExistInTheDatabase() {
        // Additional step to verify deletion by checking the database or API.
        // Assuming a GET request can verify the book's absence.
        String checkEndpoint = endpoint.replace("{id}", String.valueOf(bookId));
        Response checkResponse = RestAssured.given().get(checkEndpoint);

        System.out.println("Verifying book absence. Status Code: " + checkResponse.getStatusCode());

        Assert.assertEquals("Book still exists in the database. Deletion failed.",
                404, checkResponse.getStatusCode());
    }
}
