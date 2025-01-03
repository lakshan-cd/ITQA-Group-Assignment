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
    And the Basic Authentication username is "admin" and password is "password" for update
    When I send a PUT request
    Then the response status should be 200 for update
    And the response should contain for update:
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
    And the Basic Authentication username is "user" and password is "password" for update
    When I send a PUT request
    Then the response status should be 403 for update
    And the response should contain an errror message:
      """
 User is not permitted.
      """


  Scenario: Update a book with an empty title
    Given the API endpoint for put method is "/api/books/1"
    And the request body for update is:
      """
      {
        "id": 1,
        "title": "",
        "author": "New author"
      }
      """
    And the Basic Authentication username is "admin" and password is "password" for update
    When I send a PUT request
    Then the response status should be 400 for update
    And the response should contain for update:
      """
      {
         "error": "Title cannot be empty"
      }
      """


  Scenario: Update a book with an empty author
    Given the API endpoint for put method is "/api/books/1"
    And the request body for update is:
      """
      {
        "id": 1,
        "title": "New Title",
        "author": ""
      }
      """
    And the Basic Authentication username is "admin" and password is "password" for update
    When I send a PUT request
    Then the response status should be 400 for update
    And the response should contain for update:
      """
      {
        "error": "Author cannot be empty"
      }
      """

#  Scenario: Attempt to update a book without authentication
#    Given the API endpoint for put method is "/api/books/1"
#    And the request body for update is:
#    """
#    {
#      "id": 1,
#      "title": "No Auth Title",
#      "author": "No Auth Author"
#    }
#    """
#    And the Basic Authentication username is "" and password is "" for update
#    When I send a PUT request
#    Then the response status should be 401 for update
#    And the response should contain an errror message:
#     """
#   User is not permitted.
#    """

  Scenario: Update a book with an Invalid Book id
    Given the API endpoint for put method is "/api/books/88"
    And the request body for update is:
    """
    {
      "id": 1,
      "title": "No Auth Title",
      "author": "No Auth Author"
    }
    """
    And the Basic Authentication username is "admin" and password is "password" for update
    When I send a PUT request
    Then the response status should be 400 for update
    And the response should contain an errror message:
     """
Book id is not matched
    """