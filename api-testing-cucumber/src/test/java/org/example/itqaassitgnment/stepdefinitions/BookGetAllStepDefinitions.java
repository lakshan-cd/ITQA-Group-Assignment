package org.example.itqaassitgnment.stepdefinitions;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import org.example.itqaassitgnment.utils.APIHelper;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

public class BookGetAllStepDefinitions {
    private static final String BASEURL = "http://localhost:7081";

    APIHelper apiHelper = new APIHelper();

    private String endpoint;
    private Response response;
    private String username;
    private String password;

    @Given("API endpoint is {string}")
    public void theApiEndPointIs(String endpoint) {
        this.endpoint = BASEURL + endpoint;
    }
    @Given("Basic Authentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIs(String username, String password) {
        this.username = username;
        this.password = password;
    }
    @When("I send a GET request")
    public void iSendAPostRequest() {
        response = apiHelper.sendGetRequestWithBasicAuth(endpoint, username, password);
    }
    @Then("response status should be {int}")
    public void theResponseStatusShouldBe(int statusCode) {
        assertEquals(response.getStatusCode(), statusCode);
    }
    @Then("the response should contain an array of books")
    public void theResponseShouldContain() {
        String responseBody = response.getBody().asString();
        boolean isArray = responseBody.startsWith("[") && responseBody.endsWith("]");
        assertTrue("Response body should be an array", isArray);
    }

}
