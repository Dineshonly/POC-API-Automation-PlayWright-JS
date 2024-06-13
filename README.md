# API Automation

[![Playwright](https://img.shields.io/badge/Powered%20by-Playwright-blueviolet)](https://playwright.dev/)

This project utilizes the Playwright framework for API automation testing using JavaScript and Node.js.

# Prerequisites
Make sure you have the following components installed:
   ```bash
   1. Node.js 
   2. Visual Studio Code
   ```
# Playwright Local Setup Guide
# 1. Create a folder for source code:
   - Navigate to the any drive & Create a new folder named 'sourcecode'
# 2. Clone the repository using Visual Studio Code (VS Code):
- Open the Azure DevOps [Repo URL](https://dev.azure.com/SubaruofNewEngland/SNEDrive%202.0/_git/POC-Playwright-API-Automation) in your web browser.
- Navigate to the 'Clone' option.
- Click on the 'Clone in VS Code' option using IDE dropdown.
- When prompted, save the repository in the previously created 'sourcecode' folder.
# 3. Playwright Installation:
- Once the repository is opened in VS Code.
- Click on 3 dots(Meatballs) menu option beside Run Menu.
- Click Terminal >> New Terminal.
- Run **npm install @playwright/test@latest**. 
# 4. To change the Test Environment:
- Locate and open the .env file.
- By default, it may have NODE_ENV=qa.
- Depending on the environment you wish to run the tests on, update the NODE_ENV value accordingly.
  - NODE_ENV=qa
  - NODE_ENV=uat
  - NODE_ENV=prod
# 5. To update or use different user credentials:
- For different environments, you'll have different configuration files:
   - config.qa.json for the QA environment.
   - config.uat.json for the UAT environment.
   - config.prod.json for the Production environment.
- Open the appropriate file and edit the username and password fields as needed.

# 6. Create Automation test scripts:
Create your Playwright test scripts for API automation in the /tests directory. You can use the provided example tests as a starting point.

   Create spec.js file to write Automation scripts : `src/tests/createBookingDetails.spec.js`

   ```bash
# Sample Code:

// Importing the 'test' and 'expect' functions from the Playwright testing library
const { test, expect } = require('@playwright/test');

// Defining a test case named 'Create new booking Details'
test('Create new booking Details', async ({ request }) => {
  // Sending a POST request to the "/booking" endpoint with the specified booking details
  const response = await request.post("/booking", {
    header : {
        "Content-Type": "application/json"},
    data: {
      "firstname": "James",
      "lastname": "William",
      "totalprice": 100,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2024-06-01",
        "checkout": "2024-06-15"
      },
      "additionalneeds": "Tester"
    }
  });

  // Logging the JSON response to the console
  console.log(await response.json());

  // Validating that the response status indicates success (status code 200)
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parsing the response body as JSON
  const responseBody = await response.json();

  // Validating the contents of the booking in the response body
  expect(responseBody.booking).toHaveProperty("firstname", "James");
  expect(responseBody.booking).toHaveProperty("lastname", "William");
  expect(responseBody.booking).toHaveProperty("totalprice", 100);
  expect(responseBody.booking).toHaveProperty("depositpaid", true);
});

   ```
# 7. To run the Playwright tests, use the following command:
   ```bash
   npx playwright test
   ```
# 8. To run a specific test, use the following command:
   ```bash
   npx playwright test tests/createBookingDetails.spec.js
   ```
# 9. To see the execution reports:
   ```bash
   npx playwright show-report test-results\html
   ```