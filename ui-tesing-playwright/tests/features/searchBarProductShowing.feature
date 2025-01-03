Feature: Product Search using search bar

    Scenario: Verify product search using search bar
        Given User navigates to home page
        When User enters the product name as "Apple iphone 16" in the search bar
        And User clicks on enter button
        Then Verify the products are displayed for the searched product containing sku "AP-16"
