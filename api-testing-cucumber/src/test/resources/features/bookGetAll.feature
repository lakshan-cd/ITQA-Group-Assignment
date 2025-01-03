Feature: Book GET All API

  Scenario: Retrieve all books successfully
    Given the API endpoint is "/api/books"
    And the Basic Authentication username is "user" and password is "password"
#    When I send a GET request
#    Then the response status should be 200
#    And the response should contain an array of books