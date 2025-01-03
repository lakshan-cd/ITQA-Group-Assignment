Feature: Book POST API

  Scenario: Create a new book successfully created
    Given the API endpoint is "/api/books"
    And the request body is:
      """
      {
        "id": 2,
        "title": "Test1234",
        "author": "Test1"
      }
      """
    And the Basic Authentication username is "user" and password is "password"
    When I send a POST request
    Then the response status should be 201
    And the response should contain:
      """
      {
        "id": 2,
        "title": "Test1234",
        "author": "Test1"
      }
      """


  Scenario: Create a new book with missing mandatory fields - author
    Given the API endpoint is "/api/books"
    And the request body is:
      """
      {
        "id": 2,
        "title": "Test Mandatory Field"
      }
      """
    And the Basic Authentication username is "user" and password is "password"
    When I send a POST request
    Then the response status should be 400
    And the response should contain:
      """
      {
        "error": "Missing mandatory field: author"
      }
      """

  Scenario: Create a New Book With Missing Mandatory Fields  - title
    Given the API endpoint is "/api/books"
    And the request body is:
        """
        {
            "id": 3,
            "author": "Test Mandatory Field"
        }
        """
    And the Basic Authentication username is "user" and password is "password"
    When I send a POST request
    Then the response status should be 400
    And the response should contain:
        """
        {
            "error": "Missing mandatory field: title"
        }
        """

  Scenario: Validate book creation with custom id
    Given the API endpoint is "/api/books"
    And the request body is:
      """
      {
        "id": 10,
        "title": "Test Book",
        "author": "Test Author"
      }
      """
    And the Basic Authentication username is "user" and password is "password"
    When I send a POST request
    Then the response status should be 201
    And the response should contain:
      """
       {
        "id": 10,
        "title": "Test Book",
        "author": "Test Author"
      }
      """

  Scenario: Validate is middle spaces and leading and trailing spaces are trimmed when creating a book
    Given the API endpoint is "/api/books"
    And the request body is:
      """
      {
        "id": 5,
        "title": "     Test     Book      ",
        "author": "   Test  Author    "
      }
      """
    And the Basic Authentication username is "user" and password is "password"
    When I send a POST request
    Then the response status should be 201
    And the response should contain:
      """
       {
        "id": 5,
        "title": "Test Book",
        "author": "Test Author"
      }
      """
