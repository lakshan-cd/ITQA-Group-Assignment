import { Given, When, Then } from "@cucumber/cucumber";
import { request, APIRequestContext, APIResponse, expect } from "@playwright/test";

let baseURL: string;
let requestContext: APIRequestContext;
let response: APIResponse;
let currentRole: string;

Given("the application is running at {string}", async (url: string) => {
  baseURL = url;
  requestContext = await request.newContext(); // Create a new Playwright request context
});

Given("I am logged in as {string}", async (role: string) => {
  currentRole = role;
});

When("I send a POST request with the following payload:", async (payload: string) => {
  const parsedPayload = JSON.parse(payload); // Parse the payload from Gherkin
  response = await requestContext.post(baseURL, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${currentRole}:password`).toString("base64")}`, // Use Basic Auth for this example
      "Content-Type": "application/json",
    },
    data: parsedPayload,
  });
});

Then("the response status code should be {int}", async (statusCode: number) => {
  expect(response.status()).toBe(statusCode);
});

Then("the response body should {string}:", async (responseValidation: string, payload: string) => {
    const responseBody = await response.json(); // Get the API response body
  
    if (responseValidation.includes("contain the book details")) {
      // Parse the expected payload from the Gherkin feature file
      const expectedDetails = JSON.parse(payload);
  
      // Check if the response body contains the correct title and author
      expect(responseBody.title).toBe(expectedDetails.title);
      expect(responseBody.author).toBe(expectedDetails.author);
    } else if (responseValidation.includes("indicate that the title already exists")) {
      // Check if the response error message indicates the title already exists
      expect(responseBody.error).toContain("already exists");
    } else if (responseValidation.includes("indicate a missing title error")) {
      // Check if the response error message indicates a missing title
      expect(responseBody.error).toContain("Missing title");
    } else if (responseValidation.includes("indicate a missing author error")) {
      // Check if the response error message indicates a missing author
      expect(responseBody.error).toContain("Missing author");
    } else if (responseValidation.includes("indicate an invalid id error")) {
      // Check if the response error message indicates an invalid ID
      expect(responseBody.error).toContain("Invalid ID");
    } else if (responseValidation.includes("indicate an unauthorized access error")) {
      // Check if the response error message indicates unauthorized access
      expect(responseBody.error).toContain("Unauthorized");
    } else {
      // Throw an error for an unknown response validation
      throw new Error(`Unknown response validation: ${responseValidation}`);
    }
  });
  
