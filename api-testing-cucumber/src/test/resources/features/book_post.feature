Feature: Book POST API

  Scenario: Create a new book successfully created
    Given the API endpoint is "/api/books"
    And the request body is:
      """
      {
        "id": 1,
        "title": "Test123",
        "author": "Test"
      }
      """
    And the Basic Authentication username is "user" and password is "password"
    When I send a POST request
    Then the response status should be 201
    And the response should contain:
      """
      {
        "id": 1,
        "title": "Test123",
        "author": "Test"
      }
      """
