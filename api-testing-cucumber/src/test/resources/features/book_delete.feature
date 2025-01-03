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

    Scenario: Delete a book successfully
    Given APIendpoint is "/api/books/{id}"
    And thebook with ID 1 exists in the database
    And BasicAuthentication username is "user" and password is "password"
    When I send a DELETE request with the ID 1
    Then the response status should be 200
    And the response should contain:
      """
      {
        "message": "Book deleted successfully",
        "id": 1
      }
      """

  Scenario: User cannot delete a book
    Given APIendpoint is "/api/books/{id}"
    And thebook with ID 2 exists in the database
    And BasicAuthentication username is "user" and password is "password"
    And the "user" role does not have permission to delete books
    When I send a DELETE request to "/api/books/2"
    Then the response status should be 200
    And the response should contain:
      """
      {
        "message": "Book deleted successfully."
      }
      """
