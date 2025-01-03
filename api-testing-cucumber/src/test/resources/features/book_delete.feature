Feature: Book DELETE API

  Scenario: Admin cannot delete a book created by a user
    Given api endpoint is "/api/books/3"
    And Authentication username is "admin" and password is "adminPassword"
    When I send a DELETE request
    Then the response status must be 403
    And the response should equal to:
      """
      {
        "message": "User is not permitted."
      }
      """

  Scenario: User cannot delete a book created by admin
    Given api endpoint is "/api/books/4"
    And Authentication username is "user" and password is "password"
    When I send a DELETE request
    Then the response status must be 403
    And the response should equal to:
      """
      {
        "message": "User is not permitted."
      }
      """

  Scenario: Delete a book successfully
    Given api endpoint is "/api/books/1"
    And Authentication username is "user" and password is "password"
    When I send a DELETE request
    Then the response status must be 200
    And the response should equal to:
      """
      {
        "message": "Book deleted successfully",
        "id": 1
      }
      """

  Scenario: User cannot delete a book
    Given api endpoint is "/api/books/2"
    And Authentication username is "user" and password is "password"
    When I send a DELETE request
    Then the response status must be 403
    And the response should equal to:
      """
      {
        "message": "User is not permitted."
      }
      """
