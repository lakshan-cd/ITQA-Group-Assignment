Feature: Product Subcategory Price Update

  Scenario: Verify product price changes after switching product subcategory
    Given User is on the product details page
    When User retrieves the product price before selecting a subcategory
    And User switches to a different product subcategory
    Then Verify the product price updates after the subcategory change