Feature: Exclude Stock Out Functionality

  Scenario: Verify Exclude Stock Out button displays only in-stock products
    Given User is on the brand's product listing page 
    When User clicks the Exclude Stock Out button
    Then Verify that no Sold Out products are displayed on the page