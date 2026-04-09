import { test, expect } from "@playwright/test";

test("API GET Request", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  expect(response.status()).toBe(200);

  const json = await response.json();
  expect(json).toHaveProperty("id", 1);
  expect(json).toHaveProperty("userId", 1);
  expect(json.title).toBeTruthy();
});

test("API POST Request", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        userId: 101,
        title: "Test Title",
        body: "Testing body of the post request",
      },
    }
  );

  expect(response.status()).toBe(201);

  const json = await response.json();
  expect(json).toMatchObject({
    userId: 101,
    title: "Test Title",
    body: "Testing body of the post request",
  });
});

test("API PUT Request", async ({ request }) => {
  const response = await request.put(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      data: {
        userId: 1,
        id: 1,
        title: "Test put Title",
        body: "Testing body of the put request",
      },
    }
  );

  expect(response.status()).toBe(200);

  const json = await response.json();
  expect(json.title).toBe("Test put Title");
});

test("API DELETE Request", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  expect(response.ok()).toBeTruthy();
});