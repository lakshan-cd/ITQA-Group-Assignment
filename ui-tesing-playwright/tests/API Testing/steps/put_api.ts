import { Given, When, Then } from "@cucumber/cucumber";
import { request, APIRequestContext, APIResponse, expect } from "@playwright/test";

let baseURL: string;
let requestContext: APIRequestContext;
let response: APIResponse;
let currentRole: string;

Given("the application is running at {string}", async (url: string) => {
  baseURL = url;
  requestContext = await request.newContext();
});

Given("I am logged in as {string}", async (role: string) => {
  currentRole = role;
});


Given("a book exists with ID {int}, title {string}, author {string}", async (id: number, title: string, author: string) => {
    // Before PUT, we need to ensure the book exists. Use POST or PUT (idempotent)
    const createResponse = await requestContext.post(`${baseURL}/api/books`, { // Assuming /api/books is the correct path
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${currentRole}:password`).toString("base64")}`,
      },
      data: { id, title, author }, // Create the book
    });
  
    const status = createResponse.status();
    expect([200, 201]).toContain(status); // Check if the status code is either 200 or 201
  });
  

When("I send a PUT request to {string} with the following payload:", async (path: string, payload: string) => {
  try {
    response = await requestContext.put(`${baseURL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${currentRole}:password`).toString("base64")}`,
      },
      data: JSON.parse(payload),
    });
  } catch (error) {
    console.error("Error during PUT request:", error);
    throw error; // Re-throw the error to fail the test
  }
});

Then("the response status code should be {int}", async (statusCode: number) => {
  expect(response.status()).toBe(statusCode);
});

Then("the response body should contain:", async (dataTable) => {
  const responseBody = await response.json();
  const expected = dataTable.rowsHash();
  for (const [key, expectedValue] of Object.entries(expected)) {
    expect(responseBody).toHaveProperty(key);
    expect(String(responseBody[key])).toBe(expectedValue); // Important: Convert both to string for comparison
  }
});

Then("the response body should indicate a missing title error", async () => {
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("error");
    expect(responseBody.error).toMatch(/missing title/i); // Ensure the error message mentions "missing title"
  });