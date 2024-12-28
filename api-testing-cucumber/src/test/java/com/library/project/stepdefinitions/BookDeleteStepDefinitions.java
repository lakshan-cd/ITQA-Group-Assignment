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
public class BookDeleteStepDefinitions {

    private final APIHelper apiHelper;
    private static final String BASEURL = "http://localhost:7081";

    public BookDeleteStepDefinitions(APIHelper apiHelper) {
        this.apiHelper = apiHelper;
    }

    private String endpoint;
    private String username;
    private String password;
    private Response response;

    @Given("the API endpoint is {string}")
    public void theApiEndpointIs(String endpoint) {
        this.endpoint = BASEURL + endpoint;
    }

    @Given("the book with ID {int} exists in the database")
    public void theBookWithIdExistsInTheDatabase(int id) {
        // Assuming a helper method to verify or precondition the book exists
        boolean bookExists = apiHelper.isBookInDatabase(id);
        assertTrue("Book with ID " + id + " does not exist in the database", bookExists);
    }

    @Given("the Basic Authentication username is {string} and password is {string}")
    public void theBasicAuthenticationUsernameIs(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Given("the {string} role does not have permission to delete books")
    public void theRoleDoesNotHavePermissionToDeleteBooks(String role) {
        // Assuming a helper method that checks permissions for a role
        boolean hasDeletePermission = apiHelper.hasDeletePermission(role);
        assertTrue(role + " should not have delete permission", !hasDeletePermission);
    }

    @Given("the {string} role has permission to delete books")
    public void theRoleHasPermissionToDeleteBooks(String role) {
        // Assuming a helper method that checks permissions for a role
        boolean hasDeletePermission = apiHelper.hasDeletePermission(role);
        assertTrue(role + " should have delete permission", hasDeletePermission);
    }

    @When("I send a DELETE request with the ID {int}")
    public void iSendADeleteRequestWithTheId(int id) {
        response = apiHelper.sendDeleteRequestWithBasicAuth(endpoint.replace("{id}", String.valueOf(id)), username, password);
    }

    @Then("the response status should be {int}")
    public void theResponseStatusShouldBe(int statusCode) {
        assertEquals(statusCode, response.getStatusCode());
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

    @Then("the book with ID {int} should still exist in the database")
    public void theBookWithIdShouldStillExistInTheDatabase(int id) {
        boolean bookExists = apiHelper.isBookInDatabase(id);
        assertTrue("Book with ID " + id + " should still exist in the database", bookExists);
    }
}