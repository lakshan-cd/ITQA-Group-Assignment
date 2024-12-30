Feature: Logging validation

  Scenario: Logging
  Given Go to Logging modal
    When  Fill the logging form and submit with "nalakasampathsmp@gmail.com" and "Sampa@12"
    Then Verify the logged user display in the home page