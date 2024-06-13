// Import the 'test' and 'expect' objects from the '@playwright/test' package
const { test, expect } = require("@playwright/test");

test("Get booking Detqails", async ({ request }) => {
  // Perform a GET API request
  const getAPIResponse = await request.get("/booking/2,", {});
  
  // Validate the status code of the API response
  expect(getAPIResponse.status()).toBe(200);
  expect(getAPIResponse.ok()).toBeTruthy();
    
  // Log the JSON response from the API
  console.log(await getAPIResponse.json());
});

