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

    @Given("APIendpoint is {string}")
    public void theApiEndpointIs(String apiEndpoint) {
        this.endpoint = apiEndpoint;
        RestAssured.baseURI = "http://localhost:8080";
    }

    @Given("BasicAuthentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIsAndPasswordIs(String username, String password) {
        this.username = username;
        this.password = password;
        this.request = RestAssured.given().auth().basic(username, password);
    }

    @When("I send a DELETE request with the ID {int}")
    public void iSendADeleteRequestWithTheID(int bookId) {
        response = request.delete(endpoint.replace("{id}", String.valueOf(bookId)));
    }

    @Then("the response status should be {int}")
    public void theResponseStatusShouldBe(int expectedStatusCode) {
        Assert.assertEquals(expectedStatusCode, response.getStatusCode());
    }
}
