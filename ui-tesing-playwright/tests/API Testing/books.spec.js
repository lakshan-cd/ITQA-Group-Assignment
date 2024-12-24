import { test, expect } from '@playwright/test';

test.describe('Book API Tests', () => {
  const baseUrl = 'http://localhost:7081/api/books';
  const admin_username = 'admin';
  const username = 'username';
  const password = 'password';

  async function adminAuthenticate(request) {
    const adminBase64EncodedCredentials = Buffer.from(`${admin_username}:${password}`).toString('base64');
    return {
      'Authorization': `Basic ${adminBase64EncodedCredentials}`,
    };
  }

  async function userAuthenticate(request) {
    const adminBase64EncodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
    return {
      'Authorization': `Basic ${adminBase64EncodedCredentials}`,
    };
  }

  test.describe('Create Book API Tests', () => {
    test('API Test 01 - Get all books with admin authentication', async ({ request }) => {
      try {
        const headers = await adminAuthenticate(request);
        const response = await request.get(baseUrl, { headers });
  
        expect(response.status()).toBe(200);
  
        const books = await response.json();
        console.log("Get All Books Response:", books);
        expect(Array.isArray(books)).toBe(true);
        if (books.length > 0) {
          expect(books[0]).toHaveProperty('title');
          expect(books[0]).toHaveProperty('author');
        }
      } catch (error) {
        console.error("Error during Get all books testing:", error);
        expect(error).toBeNull();
      }
    });
  
    test('API Test 02 - Get all books with user authentication', async ({ request }) => {
      try {
        const headers = await userAuthenticate(request);
        const response = await request.get(baseUrl, { headers });
  
        expect(response.status()).toBe(200);
  
        const books = await response.json();
        console.log("Get All Books Response:", books);
        expect(Array.isArray(books)).toBe(true);
        if (books.length > 0) {
          expect(books[0]).toHaveProperty('title');
          expect(books[0]).toHaveProperty('author');
        }
      } catch (error) {
        console.error("Error during Get all books testing:", error);
        expect(error).toBeNull();
      }
    });
  })
 

  test.describe('Create Book API Tests', () => {
    test('API Test 02 - Create a book with authentication - without id', async ({ request }) => {
      const newBook = {
        title: 'IT Faculty',
        author: 'Dean',
      };
  
      try {
        const headers = await authenticate(request);
        const response = await request.post(baseUrl, {
          headers: headers,
          data: newBook,
        });
  
        expect(response.status()).toBe(201);
  
        const createdBook = await response.json();
        console.log("Created Book Response:", createdBook);
  
        expect(createdBook).toHaveProperty('id');
        expect(createdBook.title).toBe(newBook.title);
        expect(createdBook.author).toBe(newBook.author);
      } catch (error) {
        console.error("Error during Create a book test:", error);
        expect(error).toBeNull();
      }
    });
  
    test('API Test 03 - Create a book with authentication - with new id', async ({ request }) => {
      const newBook = {
        id: Math.floor(Math.random() * 100000), // Generate a random ID
        title: 'IT Faculty with new id',
        author: 'Dean with new id',
      };
  
      try {
        const headers = await authenticate(request);
        const response = await request.post(baseUrl, {
          headers: headers,
          data: newBook,
        });
  
        expect(response.status()).toBe(201);
  
        const createdBook = await response.json();
        console.log("Created Book Response:", createdBook);
  
        expect(createdBook).toHaveProperty('id');
        expect(createdBook.title).toBe(newBook.title);
        expect(createdBook.author).toBe(newBook.author);
        expect(createdBook.id).toBe(newBook.id); // Verify the returned ID matches
      } catch (error) {
        console.error("Error during Create a book test - with new id:", error);
        expect(error).toBeNull();
      }
    });

    test('API Test 04 - Create a book with authentication - with existing id', async ({ request }) => {
      const newBook = {
        id: 1,
        title: 'IT Faculty with new id',
        author: 'Dean with new id',
      };
  
      try {
        const headers = await authenticate(request);
        const response = await request.post(baseUrl, {
          headers: headers,
          data: newBook,
        });
  
        expect(response.status()).toBe(201);
  
        const createdBook = await response.json();
        console.log("Created Book Response:", createdBook);
  
        expect(createdBook).toHaveProperty('id');
        expect(createdBook.title).toBe(newBook.title);
        expect(createdBook.author).toBe(newBook.author);
        expect(createdBook.id).toBe(newBook.id); // Verify the returned ID matches
      } catch (error) {
        console.error("Error during Create a book test - with new id:", error);
        expect(error).toBeNull();
      }
    });

    test('API Test 05 - Create a book with authentication - Missing Title', async ({ request }) => {
        const newBook = {
            author: 'Douglas Adams',
        };

        try {
            const headers = await authenticate(request);
            const response = await request.post(baseUrl, {
                headers: headers,
                data: newBook,
            });

            expect(response.status()).toBe(400);

        } catch (error) {
            console.error("Error during Create a book test - Missing Title:", error);
            expect(error).toBeNull();
        }
    });

    test('API Test 06 - Create a book with authentication - Missing Author', async ({ request }) => {
        const newBook = {
            title: 'The Restaurant at the End of the Universe',
        };

        try {
            const headers = await authenticate(request);
            const response = await request.post(baseUrl, {
                headers: headers,
                data: newBook,
            });

            expect(response.status()).toBe(400);

        } catch (error) {
            console.error("Error during Create a book test - Missing Author:", error);
            expect(error).toBeNull();
        }
    });
  });
});

