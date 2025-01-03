Feature: Service Center Search Functionality

  Scenario: Verify service center agents appear after searching for a city
    Given User is on the Service Centers page
    When User enters a city name in the search field
    Then Verify the displayed service center addresses include the searched city