Feature: Career Opportunities Page

  Scenario: Verify Career Opportunities page title
    Given User navigates to the Career Opportunities page
    Then The Career Opportunities page title should be correct

  Scenario: Verify job listings visibility
    Given User navigates to the Career Opportunities page
    When Job listings are visible

  Scenario: Apply for IT Operations Assistant job
    Given User navigates to the Career Opportunities page
    When User applies for the IT Operations Assistant job

  Scenario: Verify Singer.lk link redirection
    Given User navigates to the Career Opportunities page
    Then Clicking the Singer.lk button redirects to the Singer.lk website
