# Group 6 - Project Testing Instructions

Welcome to the testing repository for Group 6. Below are the detailed instructions to perform both UI and API tests for the project. Follow each step carefully to ensure accurate results.

---

## UI Testing

To run UI tests using Playwright and Cucumber, follow the steps below:

1. **Navigate to the UI testing directory**
   ```bash
   cd .\ui-tesing-playwright\
   ```
   This command moves you to the directory where the UI testing project is located.

2. **Install project dependencies**
   ```bash
   npm i
   ```
   This will install all the required Node.js modules listed in the `package.json` file.

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```
   This command downloads the necessary browsers for Playwright testing.

4. **Run tests using Cucumber**
   ```bash
   npx cucumber-js test --format json:allure-results/results.json
   ```
   This runs the UI test suite and generates results in a format compatible with Allure Reports.

5. **Generate the Allure report**
   ```bash
   allure generate allure-results --clean
   ```
   This creates a clean, comprehensive Allure report from the test results.

6. **View the Allure report**
   ```bash
   allure open
   ```
   This command launches the Allure report in your default web browser for detailed analysis.

---

## API Testing

To run API tests using Maven and Cucumber, follow these steps:

1. **Navigate to the API testing directory**
   ```bash
   cd .\api-testing-cucumber\
   ```
   This changes the working directory to where the API testing project is located.

2. **Clean and install the project dependencies**
   ```bash
   mvn clean install
   ```
   This cleans the existing build and installs all the dependencies required for the project.

3. **Run the test suite**
   ```bash
   mvn run test
   ```
   Executes the API test cases defined in the project.

4. **Generate the Allure report**
   ```bash
   mvn allure:report
   ```
   Creates an Allure report based on the API test results.

5. **Open the Allure report**
   ```bash
   mvn allure:serve
   ```
   Launches the Allure report in a browser for analysis.

---

## Notes
- Ensure you have all prerequisites installed, including Node.js, Maven, and Allure CLI.
- Follow the steps in order to avoid missing any dependencies or configurations.
- For any issues or clarifications, reach out to the Group 6 team.
