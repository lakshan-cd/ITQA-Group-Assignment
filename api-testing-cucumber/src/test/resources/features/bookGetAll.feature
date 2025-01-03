Feature: Book GET All API

  Scenario: Retrieve all books successfully
    Given API endpoint is "/api/books"
    And Basic Authentication username is "user" and password is "password"
    When I send a GET request
    Then response status should be 200
    And the response should contain an array of books