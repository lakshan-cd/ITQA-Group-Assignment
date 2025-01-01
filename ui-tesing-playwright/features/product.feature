# Feature: Product Filtering by Price Range

#   Scenario Outline: Validate product filtering by price range
#     Given User navigates to the Product Listing Page
#     When User sets the minimum price as "<min>" and maximum price as "<max>"
#     And Get the product price list
#     Then If no products are found, verify the No Products Found message is displayed
#     And If products are found, verify all displayed products fall within the selected price range

#   Examples:
#     |min|max|
#     | 200000|300000|
#     |0| 50000|
#     |asf222|300000|
#     |-1000|0|
#     |200000|100|

