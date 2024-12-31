Feature: Product Filtering by Price Range

  Scenario: Validate product filtering by price range
    Given User navigates to the Product Listing Page
    When User sets the minimum price as "-vzx2000" and maximum price as "-300000"
    Then If no products are found, verify the "No Products Found" message is displayed
    And If products are found, verify all displayed products fall within the selected price range