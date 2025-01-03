Feature: Brand Filtering Functionality

  Scenario: Verify a brand displays only that brand's products
    Given User is on the Brands Page
    When User clicks on a specific brand and navigates to the brands product listing page
    And User retrieves the brand name
    And User retrieves the names of all products listed on the page
    Then Verify all products displayed belong to the selected brand