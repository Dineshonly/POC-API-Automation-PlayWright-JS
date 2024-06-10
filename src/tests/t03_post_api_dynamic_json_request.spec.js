// Import the 'test' and 'expect' objects from the '@playwright/test' package
const { test, expect } = require("@playwright/test"); 
// Importing faker library for generating fake data
import { faker } from "@faker-js/faker"; 
// Importing DateTime object from Luxon library for date manipulation
const { DateTime } = require("luxon"); 
// Importing dynamic request body from external JSON file
const dynamicRequest = require("../fixtures/dynamic_request_body.json"); 
// Importing stringFormat function from a utility file
import { stringFormat } from "../utils/stringFormatHelper"; 

test("Post API request using dynamic JSON file", async ({request}) => {

  // Generate dynamic test data using faker and DateTime
  const firstName = faker.person.firstName(); 
  const lastName = faker.person.lastName(); 
  const totalPrice = faker.number.int(1000);
  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd"); 
  const checkOutDate = DateTime.now().plus({ day: 6 }).toFormat("yyyy-MM-dd");

  // Format the dynamic data into the request body template
  var updatedRequestBody = stringFormat(JSON.stringify(dynamicRequest),
    firstName,
    lastName,
    "Tester", 
    totalPrice,
    checkInDate,
    checkOutDate
  );

  // Create a POST API request using Playwright
  const postAPIResponse = await request.post("/booking", {
    data: JSON.parse(updatedRequestBody),
  });

  // Verifying the response
  expect(postAPIResponse.status()).toBe(200); 
  expect(postAPIResponse.ok()).toBeTruthy(); 
  console.log(await postAPIResponse.json()); 


  // Validate the API response JSON object
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName); 
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);
});
