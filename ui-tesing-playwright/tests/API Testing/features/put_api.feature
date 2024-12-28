Feature: Put Books API

  Background:
    Given the application is running at "http://localhost:7081"

  Scenario Outline: Update a book successfully
    Given I am logged in as "<role>"
    And a book exists with ID <id>, title "<oldTitle>", author "<oldAuthor>"
    When I send a PUT request to "/api/books/<id>" with the following payload:
      """
      {
        "id": <id>,
        "title": "<newTitle>",
        "author": "<newAuthor>"
      }
      """
    Then the response status code should be 200
    And the response body should contain:
      | key    | value       |
      | id     | <id>        |
      | title  | <newTitle>  |
      | author | <newAuthor> |
    Examples:
      | role  | id | oldTitle       | oldAuthor      | newTitle       | newAuthor      |
      | admin | 1  | Original Title | Original Author | Updated Title | Updated Author |


  Scenario Outline: Update a book with empty title
    Given I am logged in as "<role>"
    And a book exists with ID <id>, title "<oldTitle>", author "<oldAuthor>"
    When I send a PUT request to "/api/books/<id>" with the following payload:
      """
      {
        "id": <id>,
        "title": "",
        "author": "<newAuthor>"
      }
      """
    Then the response status code should be 400
    And the response body should indicate a missing title error
    Examples:
      | role  | id | oldTitle       | oldAuthor      | newAuthor      |
      | admin | 2  | Original Title | Original Author | Updated Author |



#   Scenario Outline: Update a book with empty author
#     Given I am logged in as "<role>"
#     And a book exists with ID <id>, title "<oldTitle>", author "<oldAuthor>"
#     When I send a PUT request to "/api/books/<id>" with the following payload:
#       """
#       {
#         "id": <id>,
#         "title": "<newTitle>",
#         "author": ""
#       }
#       """
#     Then the response status code should be 400
#     And the response body should indicate a missing author error
#     Examples:
#       | role  | id | oldTitle       | oldAuthor      | newTitle      |
#       | admin | 3  | Original Title | Original Author | Updated Title |


#   Scenario Outline: Update a book with non-existent ID
#     Given I am logged in as "<role>"
#     When I send a PUT request to "/api/books/9999" with the following payload:
#       """
#       {
#         "id": 9999,
#         "title": "New Title",
#         "author": "New Author"
#       }
#       """
#     Then the response status code should be 404
#     And the response body should indicate book not found
#     Examples:
#       | role  |
#       | admin |

#   Scenario Outline: Update a book with different ID in payload and URL
#     Given I am logged in as "<role>"
#     And a book exists with ID 4, title "Original Title", author "Original Author"
#     When I send a PUT request to "/api/books/4" with the following payload:
#       """
#       {
#         "id": 5, # Different ID in payload
#         "title": "New Title",
#         "author": "New Author"
#       }
#       """
#     Then the response status code should be 400
#     And the response body should indicate ID mismatch
#     Examples:
#       | role  |
#       | admin |

#   Scenario Outline: Unauthorized update (User role)
#     Given I am logged in as "user"
#     And a book exists with ID 6, title "Original Title", author "Original Author"
#     When I send a PUT request to "/api/books/6" with the following payload:
#       """
#       {
#         "id": 6,
#         "title": "New Title",
#         "author": "New Author"
#       }
#       """
#     Then the response status code should be 403
#     And the response body should indicate forbidden access