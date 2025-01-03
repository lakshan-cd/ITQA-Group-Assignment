package org.example.itqaassitgnment.stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import org.example.itqaassitgnment.utils.APIHelper;
import org.example.itqaassitgnment.utils.DeleteRequestFactory;
import org.example.itqaassitgnment.utils.PostRequestFactory;
import org.example.itqaassitgnment.utils.RequestFactory;
import org.junit.Assert;

public class BookDeleteStepDefinitions {
    private static final String BASEURL = "http://localhost:7081";

    private Response response;
    private String endpoint;
    private String username;
    private String password;
    private String requestBody;

    @Given("api endpoint is {string}")
    public void theApiEndpointIs(String apiEndpoint) {
        this.endpoint = BASEURL + apiEndpoint;
    }

    @Given("Authentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIsAndPasswordIs(String username, String password) {
        this.username = username;
        this.password = password;
    }
    @Given("the request is:")
    public void theRequestBodyIs(String requestBody) {
        this.requestBody = requestBody;
    }

    @When("I send a DELETE request")
    public void iSendADeleteRequest() {
        try {
            RequestFactory requestFactory = new DeleteRequestFactory();
            response = requestFactory.createRequest(endpoint,requestBody, username, password);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send DELETE request.");
        }
    }

    @When("I send POST request")
    public void iSendAPostRequest() {
        try {
            RequestFactory requestFactory = new PostRequestFactory();
            response = requestFactory.createRequest(endpoint,requestBody, username, password);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send POST request.");
        }
    }

    @Then("the response status must be {int}")
    public void theResponseStatusShouldBe(int expectedStatusCode) {
        try {
            Assert.assertNotNull("Response is null. Ensure DELETE request was executed.", response);
            int actualStatusCode = response.getStatusCode();
            Assert.assertEquals("Unexpected status code.", expectedStatusCode, actualStatusCode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to assert DELETE request.");
        }
    }

    @Then("the response should equal to:")
    public void theResponseShouldContain(String expectedBody) {
        try {
            Assert.assertNotNull("Response is null. Ensure DELETE request was executed.", response);
            String actualBody = response.getBody().asString();
            Assert.assertEquals("Response body does not match expected content.", expectedBody.trim(), actualBody.trim());
        } catch (Exception e) {
            throw new RuntimeException("Failed to assert DELETE request.");
        }
    }
}
