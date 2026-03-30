import { test, expect } from "@playwright/test";

test("API GET Request", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("sunt");
  console.log(await response.json());
});

test("API POST Request", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        userId: 101,
        id: 101,
        title:
          "Test Title",
        body: "Testing body of the post request",
      },
    },
  );
  expect(response.status()).toBe(201);
  const text = await response.text();
  expect(text).toContain("Test");
  console.log(await response.json());
});
