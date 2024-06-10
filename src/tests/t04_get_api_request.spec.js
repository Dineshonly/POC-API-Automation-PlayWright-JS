// Import the 'test' and 'expect' objects from the '@playwright/test' package
const { test, expect } = require("@playwright/test");

test("GET API request", async ({ request }) => {
  // Perform a GET API request
  const getAPIResponse = await request.get("/booking/5668,", {});
  
  // Validate the status code of the API response
  expect(getAPIResponse.status()).toBe(200);
  expect(getAPIResponse.ok()).toBeTruthy();
  
  
  // Log the JSON response from the API
  console.log(await getAPIResponse.json());
});

