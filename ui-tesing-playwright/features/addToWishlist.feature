Feature: Wishlist Management

  Scenario: Verify product added to wishlist is displayed in the wishlist page
    Given User is logged in with valid session cookies
    And User navigates to the Product Listing Page
    When User adds a product to the wishlist
    And User navigates to the Wishlist page
    Then Verify the product is displayed in the Wishlist
