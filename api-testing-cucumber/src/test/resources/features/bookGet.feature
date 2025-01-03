Feature: Book GET by ID API

  Scenario: Retrieve a book by ID successfully
    Given the API endpoint is: "/api/books/5"
    And Basic Authentication username is: "admin" and password is "password"
    When I send GET request
    Then response status should be: 200
    And the response should contain the book with ID "{5}"

  Scenario: Retrieve a non-existing book by ID
    Given the API endpoint is: "/api/books/9999"
    And Basic Authentication username is: "admin" and password is "password"
    When I send GET request
    Then response status should be: 404

  Scenario: Authentication fails with invalid username or password
    Given the API endpoint is: "/api/books/5"
    And Basic Authentication username is: "user" and password is "password"
    When I send GET request
    Then response status should be: 403

  Scenario: Authentication fails with empty username and password
    Given the API endpoint is: "/api/books/5"
    And Basic Authentication username is: "" and password is ""
    When I send GET request
    Then response status should be: 401
