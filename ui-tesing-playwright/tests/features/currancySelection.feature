Feature: Currency Selection

    Scenario: When a currency is selected the price of the products should be the same as the currency
        Given User navigates to the home page
        When User selects a currency as 'USD' from the dropdown menu
        Then The price of the products price should be displayed in 'USD'

