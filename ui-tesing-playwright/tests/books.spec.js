import { test, expect } from '@playwright/test';

test('Get all books with authentication', async ({ request }) => {
  const baseUrl = 'http://localhost:7081/api/books';
  const username = 'admin';
  const password = 'password';

  const base64EncodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    const response = await request.get(baseUrl, {
      headers: {
        'Authorization': `Basic ${base64EncodedCredentials}`,
      },
    });

    expect(response.status()).toBe(200);

    const books = await response.json();
    console.log("Get All Books Response:", books);
    expect(Array.isArray(books)).toBe(true);
      if (books.length > 0) {
          expect(books[0]).toHaveProperty('title');
          expect(books[0]).toHaveProperty('author');
      }

  } catch (error) {
    console.error("Error during Get all books test:", error);
    expect(error).toBeNull();
  }
});
