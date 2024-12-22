package com.library.project.stepdefinitions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.library.project.utils.APIHelper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.restassured.response.Response;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@SpringBootTest
public class BookPostStepDefinitions {

    private final APIHelper apiHelper;
    private static final String BASEURL = "http://localhost:7081";

    public BookPostStepDefinitions(APIHelper apiHelper) {
        this.apiHelper = apiHelper;
    }

    private String endpoint;
    private String requestBody;
    private Response response;
    private String username;
    private String password;

    @Given("the API endpoint is {string}")
    public void theApiEndPointIs(String endpoint) {
        this.endpoint = BASEURL + endpoint;
    }

    @Given("the request body is:")
    public void theRequestBodyIs(String requestBody) {
        this.requestBody = requestBody;
    }

    @Given("the Basic Authentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIs(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @When("I send a POST request")
    public void iSendAPostRequest() {
        response = apiHelper.sendPostRequestWithBasicAuth(endpoint, requestBody, username, password);
    }

    @Then("the response status should be {int}")
    public void theResponseStatusShouldBe(int statusCode) {
        assertEquals(response.getStatusCode(), statusCode);
    }

    @Then("the response should contain:")
    public void theResponseShouldContain(String expectedResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse both expected and actual response JSON into objects
            Object expectedJson = objectMapper.readValue(expectedResponse, Object.class);
            Object actualJson = objectMapper.readValue(response.getBody().asString(), Object.class);

            // Compare the parsed JSON objects
            assertEquals(expectedJson, actualJson);
        } catch (Exception e) {
            e.printStackTrace();
            throw new AssertionError("Failed to compare JSON responses");
        }
    }
}