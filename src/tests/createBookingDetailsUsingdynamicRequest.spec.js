// Importing test and expect objects from Playwright test framework
const { test, expect } = require("@playwright/test"); 
// Importing faker library for generating fake data
import { faker } from "@faker-js/faker"; 
// Importing DateTime object from Luxon library for date manipulation
const { DateTime } = require("luxon"); 

test("Create Booking Details using dynamic request", async ({request}) => {
  // Generate dynamic test data using faker-js & luxon
  const firstName = faker.person.firstName(); 
  const lastName = faker.person.lastName(); 
  const totalPrice = faker.number.int(1000); 
  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd"); 
  const checkOutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd"); 

  // Create a POST API request using Playwright with dynamic test data
  const postAPIResponse = await request.post("/booking", {
    data: {
      firstname: firstName, 
      lastname: lastName, 
      totalprice: totalPrice, 
      depositpaid: true,
      bookingdates: {
        checkin: checkInDate, 
        checkout: checkOutDate 
      },
      additionalneeds: "Tester" 
    },
  });

  // Verifying the response
  expect(postAPIResponse.status()).toBe(200); 
  expect(postAPIResponse.ok()).toBeTruthy();
  console.log(await postAPIResponse.json()); 

  // Validate the API response JSON object
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName); 
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName); 
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin",checkInDate);   
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout",checkOutDate); 
});
