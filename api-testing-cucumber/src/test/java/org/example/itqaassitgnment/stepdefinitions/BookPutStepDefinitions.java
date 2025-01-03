package org.example.itqaassitgnment.stepdefinitions;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import org.example.itqaassitgnment.utils.APIHelper;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.*;

@SpringBootTest
public class BookPutStepDefinitions {

    private static final String BASEURL = "http://localhost:7081";

    APIHelper apiHelper = new APIHelper();

    private String endpoint;
    private String requestBody;
    private Response response;
    private String username;
    private String password;

    @Given("the API endpoint for put method is {string}")
    public void theApiEndpointForPutMethodIs(String endpoint) {
        this.endpoint = BASEURL + endpoint;
    }

    @Given("the request body for update is:")
    public void theRequestBodyForUpdateIs(String requestBody) {
        this.requestBody = requestBody;
    }

    @Given("the Basic Authentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIs(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @When("I send a PUT request")
    public void iSendAPutRequest() {
        response = apiHelper.sendPutRequestWithBasicAuth(endpoint, requestBody, username, password);
    }

    @Then("the response status should be {int}")
    public void theResponseStatusShouldBe(int statusCode) {
        assertEquals("Unexpected status code", statusCode, response.getStatusCode());
    }

    @Then("the response should contain:")
    public void theResponseShouldContain(String expectedResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse both expected and actual response JSON into objects
            Object expectedJson = objectMapper.readValue(expectedResponse, Object.class);
            System.out.println(response.getBody().asString());
            Object actualJson = objectMapper.readValue(response.getBody().asString(), Object.class);

//             Compare the parsed JSON objects
            assertEquals(expectedJson, actualJson);

        } catch (Exception e) {
            e.printStackTrace();
            throw new AssertionError("Failed to compare JSON responses");
        }
    }
}
