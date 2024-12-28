Feature: Post Books API

  Background:
    Given the application is running at "http://localhost:7081/api/books"

  Scenario Outline: POST a new book with different payloads
    Given I am logged in as "<role>"
    When I send a POST request with the following payload:
      """
      {
        "id": <id>,
        "title": "<title>",
        "author": "<author>"
      }
      """
    Then the response status code should be <statusCode>
    # And the response body should <responseValidation>:
    #   """
    #   {
    #     "title": "<title>",
    #     "author": "<author>"
    #   }
    #   """

    Examples:
      | role  | id   | title     | author    | statusCode | responseValidation       |
      # | admin |    1 | Title-001 | Author-01 |        201 | contain the book details |
      # | admin | null | Title-042 | Author-01 |        201 | contain the book details |
      # | admin | 1 | Title-03         | Author-01 |        208 | indicate that the id already exists |
      # | admin | 52 | Title-001         | Author-01 |        208 | indicate that the title already exists |
      # | admin | 54 |                  | Author-01 |        400 | indicate a missing title error         |
      # | admin | 55 | Title-04         |           |        400 | indicate a missing author error        |
      # | admin | -1 | The Great Gatsby | Author-01 |        400 | indicate an invalid id error           |
      # | admis |  4 | The Great Gatsby | Author-01 |        401 | indicate an unauthorized access error  |
      # | user  | 52 | Title-02         | Author-01 |        201 | contain the book details               |
    #   | user  |    | Title-02         | Author-01 |        201 | contain the book details               |
    #   | user  | 51 | Title-03         | Author-01 |        208 | indicate that the title already exists |
    #   | user  | 53 | Title-01         | Author-01 |        208 | indicate that the title already exists |
    #   | user  | 54 |                  | Author-01 |        400 | indicate a missing title error         |
    #   | user  | 55 | Title-04         |           |        400 | indicate a missing author error        |
    #   | user  | -1 | The Great Gatsby | Author-01 |        400 | indicate an invalid id error           |
    #   | user  |  4 | The Great Gatsby | Author-01 |        401 | indicate an unauthorized access error  |
