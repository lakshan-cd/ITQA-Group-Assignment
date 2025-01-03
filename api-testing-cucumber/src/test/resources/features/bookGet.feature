Feature: Book GET by ID API

  Scenario: Retrieve a book by ID successfully
    Given the API endpoint is: "/api/books/5"
    And Basic Authentication username is: "admin" and password is "password"
    When I send GET request
    Then response status should be: 200
    And the response should contain the book with ID "{5}"