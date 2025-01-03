package org.example.itqaassitgnment.stepdefinitions;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import org.example.itqaassitgnment.utils.APIHelper;
import static org.junit.Assert.assertEquals;
import io.restassured.response.Response;
import org.junit.Assert;
public class BookGetStepDefinitions {
    private static final String BASEURL = "http://localhost:7081";

    APIHelper apiHelper = new APIHelper();

    private String endpoint;
    private Response response;
    private String username;
    private String password;


    @Given("the API endpoint is: {string}")
    public void theApiEndPointIs(String endpoint) {
        this.endpoint = BASEURL + endpoint;
    }
    @Given("Basic Authentication username is: {string} and password is {string}")
    public void theBasicAuthenticationUsernameIs(String username, String password) {
        this.username = username;
        this.password = password;
    }
    @When("I send GET request")
    public void iSendAPostRequest() {
        response = apiHelper.sendGetRequestWithBasicAuth(endpoint, username, password);
    }
    @Then("response status should be: {int}")
    public void theResponseStatusShouldBe(int statusCode) {
        assertEquals(response.getStatusCode(), statusCode);
    }

    @And("the response should contain the book with ID {string}")
    public void theResponseShouldContainTheBookWithID(String expectedId) {
        expectedId = expectedId.replace("{", "").replace("}", "");
        String actualId = response.jsonPath().getString("id");
        Assert.assertEquals("The ID in the response does not match the expected ID", expectedId, actualId);
    }
}
