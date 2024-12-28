Feature: Book DELETE API

  Scenario: Delete a book successfully
    Given the API endpoint is "/api/books/{id}"
    And the book with ID 1 exists in the database
    And the Basic Authentication username is "user" and password is "password"
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
    Given the API endpoint is "/api/books/{id}"
    And the book with ID 2 exists in the database
    And the Basic Authentication username is "user" and password is "password"
    And the "user" role does not have permission to delete books
    When I send a DELETE request to "/api/books/2"
    Then the response status should be 200
    And the response should contain:
      """
      {
        "message": "Book deleted successfully."
      }
      """

  Scenario: Admin cannot delete a book created by user
    Given the API endpoint is "/api/books/{id}"
    And the book with ID 3 exists in the database
    And the Basic Authentication username is "admin" and password is "password"
    And the "admin" role have permission to delete books
    When I send a DELETE request to "/api/books/3"
    Then the response status should be 403
    And the response should contain:
      """
      {
        "message": "User is not permitted."
      }
      """
    And the book with ID 3 should still exist in the database


  Scenario: User cannot delete a book created by admin
    Given the API endpoint is "/api/books/{id}"
    And the book with ID 4 exists in the database
    And the Basic Authentication username is "user" and password is "password"
    And the "user" role does not have permission to delete books
    When I send a DELETE request to "/api/books/4"
    Then the response status should be 403
    And the response should contain:
      """
      {
        "message": "User is not permitted."
      }
      """
    And the book with ID 4 should still exist in the database



