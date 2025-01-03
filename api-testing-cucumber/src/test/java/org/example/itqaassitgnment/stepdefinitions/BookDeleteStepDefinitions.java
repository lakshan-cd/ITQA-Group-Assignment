package org.example.itqaassitgnment.stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import org.example.itqaassitgnment.utils.APIHelper;
import org.junit.Assert;

public class BookDeleteStepDefinitions {

    private Response response;
    private String endpoint;
    private String username;
    private String password;

    APIHelper apiHelper = new APIHelper();

    @Given("api endpoint is {string}")
    public void theApiEndpointIs(String apiEndpoint) {
        this.endpoint = apiEndpoint;
    }

    @Given("Authentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIsAndPasswordIs(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @When("I send a DELETE request")
    public void iSendADeleteRequest() {
        response = apiHelper.sendDeleteRequestWithBasicAuth(endpoint, username, password);
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
}
