package org.example.itqaassitgnment.stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.example.itqaassitgnment.utils.APIHelper;
import org.junit.Assert;

public class BookDeleteStepDefinitions {

    private Response response;
    private String endpoint;
    private String username;
    private String password;
    private int bookId; // Declare bookId to track the book being tested
    private final APIHelper apiHelper = new APIHelper(); // Initialize ApiHelper

    @Given("api endpoint is {string}")
    public void theApiEndpointIs(String apiEndpoint) {
        this.endpoint = apiEndpoint;
    }

    @Given("Authentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIsAndPasswordIs(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @When("I send a DELETE request with the ID {int}")
    public void iSendADeleteRequestWithTheID(int bookId) {
        this.bookId = bookId; // Track book ID for later validations
        String finalEndpoint = endpoint.replace("{id}", String.valueOf(bookId));

        // Use ApiHelper to send the DELETE request
        response = apiHelper.sendDeleteRequestWithBasicAuth(finalEndpoint, username, password);

        // Log response details for debugging
        System.out.println("Response Status Code: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody().asString());
    }

    @Then("the response status must be {int}")
    public void theResponseStatusShouldBe(int expectedStatusCode) {
        Assert.assertNotNull("Response is null. Ensure DELETE request was executed.", response);
        int actualStatusCode = response.getStatusCode();
        Assert.assertEquals("Unexpected status code.", expectedStatusCode, actualStatusCode);
    }

    @Then("the response should equal to:")
    public void theResponseShouldContain(String expectedBody) {
        Assert.assertNotNull("Response is null. Ensure DELETE request was executed.", response);
        String actualBody = response.getBody().asString();
        Assert.assertTrue("Response body does not contain expected content.",
                actualBody.contains(expectedBody.trim()));
    }

    @Then("the book with ID {int} should still exist in the database")
    public void theBookShouldStillExistInTheDatabase(int bookId) {
        String checkEndpoint = endpoint.replace("{id}", String.valueOf(bookId));

        // Use ApiHelper to send the GET request with authentication
        Response checkResponse = apiHelper.sendGetRequestWithBasicAuth(checkEndpoint, username, password);

        Assert.assertEquals("Book does not exist in the database when it should.",
                200, checkResponse.getStatusCode());
    }
}
