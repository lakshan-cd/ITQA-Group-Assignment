Feature: Book DELETE API

  Scenario: Admin cannot delete a book created by a user
    Given api endpoint is "/api/books/{id}"
    And Authentication username is "admin" and password is "adminPassword"
    When I send a DELETE request with the ID 3
    Then the response status must be 403
    And the response should equal to:
      """
      {
        "message": "User is not permitted."
      }
      """
    And the book with ID 3 should still exist in the database

  Scenario: User cannot delete a book created by admin
    Given api endpoint is "/api/books/{id}"
    And Authentication username is "user" and password is "password"
    When I send a DELETE request with the ID 4
    Then the response status must be 403
    And the response should equal to:
      """
      {
        "message": "User is not permitted."
      }
      """
    And the book with ID 4 should still exist in the database
