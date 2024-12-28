Feature: Library API Testing
  To validate the functionality of the Library API for both user and admin roles.

  Background:
    Given the application is running at "http://localhost:7081"

#   Testing GET method
  Scenario Outline: GET all books for both roles
    Given I am logged in as "<role>"
    When I send a GET request to "/api/books"
    Then the response status code should be 200
    And the response should contain the list of books
    Examples:
      | role  |
      | admin |
      | user  |
