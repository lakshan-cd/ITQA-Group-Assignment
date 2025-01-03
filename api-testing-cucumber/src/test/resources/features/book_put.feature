Feature: Book PUT API

  Scenario: Admin can update a book successfully
    Given the API endpoint for put method is "/api/books/1"
    And the request body for update is:
      """
      {
        "id": 1,
        "title": "ta1",
        "author": "aa1"
      }
      """
    And the Basic Authentication username is "admin" and password is "password"
    When I send a PUT request
    Then the response status should be 200
    And the response should contain:
      """
      {
        "id": 1,
        "title": "ta1",
        "author": "aa1"
      }
      """

  Scenario: User cannot update a book
    Given the API endpoint for put method is "/api/books/1"
    And the request body for update is:
      """
      {
      "id": 1,
        "title": "tu1",
        "author": "au1"
      }
      """
    And the Basic Authentication username is "user" and password is "password"
    When I send a PUT request
    Then the response status should be 403

