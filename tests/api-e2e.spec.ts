import { test, expect } from "@playwright/test";

test("Complete E2E API Test - Booking Lifecycle", async ({ request }) => {

  let bookingId;
  let token;

  //Create API
  const createResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: {
        firstname: "Rashmi",
        lastname: "Test",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-04-10",
          checkout: "2026-04-15"
        },
        additionalneeds: "Breakfast"
      }
    }
  );

  expect(createResponse.status()).toBe(200);

  const created = await createResponse.json();
  bookingId = created.bookingid;

  expect(bookingId).toBeTruthy();


  //Verify Create API
  const getResponse = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`
  );

  expect(getResponse.status()).toBe(200);

  const fetched = await getResponse.json();
  expect(fetched.firstname).toBe("Rashmi");


  //Authentication (GET TOKEN)
  const authResponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: {
        username: "admin",
        password: "password123"
      }
    }
  );

  expect(authResponse.status()).toBe(200);

  const auth = await authResponse.json();
  token = auth.token;

  expect(token).toBeTruthy();


  //Update API
  const updateResponse = await request.put(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`
      },
      data: {
        firstname: "Updated",
        lastname: "User",
        totalprice: 600,
        depositpaid: false,
        bookingdates: {
          checkin: "2026-04-12",
          checkout: "2026-04-18"
        },
        additionalneeds: "Lunch"
      }
    }
  );

  expect(updateResponse.status()).toBe(200);


  //Verify Updated API
  const verifyUpdate = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`
  );

  expect(verifyUpdate.status()).toBe(200);

  const updated = await verifyUpdate.json();
  expect(updated.firstname).toBe("Updated");


  //Delete API
  const deleteResponse = await request.delete(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        "Cookie": `token=${token}`
      }
    }
  );

  expect(deleteResponse.status()).toBe(201);


  //Verify Delete API
  const afterDelete = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`
  );

  expect(afterDelete.status()).toBe(404);

});