@web @product
Feature: Product Comparison Management
  Scenario: Verify Comparison Functionality Displays Correct Product Details
    Given User is on the Product Page
    When User retrieves details of the products
    And User add the products to the comparison list
    And User navigates to the Product Comparison page
    And User retrieves details of the products in compare model
    Then Verify the products details are displayed correctly in the comparison list
  
