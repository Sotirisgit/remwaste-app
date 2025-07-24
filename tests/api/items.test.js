const request = require('supertest');

const BASE_URL = 'https://remwastebackend.onrender.com';

describe('Items API Tests (Fixed)', () => {
  let authToken;
  let createdItemId;

  // Helper function to get auth token
  const getAuthToken = async () => {
    const response = await request(BASE_URL)
      .post('/login')
      .send({
        username: 'remwaste',
        password: '12345'
      });
    return response.body.token;
  };

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  describe('GET /items', () => {
    it('should return 403 when no token provided', async () => {
      const response = await request(BASE_URL)
        .get('/items')
        .expect(403);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(BASE_URL)
        .get('/items')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    it('should return items array with valid token', async () => {
      const response = await request(BASE_URL)
        .get('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /items', () => {
    it('should return 403 when no token provided', async () => {
      const response = await request(BASE_URL)
        .post('/items')
        .send({ name: 'Test Item' })
        .expect(403);

      expect(response.body).toHaveProperty('error');
    });

    it('should create item successfully with valid token', async () => {
      const itemName = `Test Item ${Date.now()}`;
      
      const response = await request(BASE_URL)
        .post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: itemName })
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', itemName);
      expect(typeof response.body.id).toBe('number');
      
      createdItemId = response.body.id;
    });

    it('should return 400 for missing name field', async () => {
      const response = await request(BASE_URL)
        .post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /items/:id', () => {
    it('should return 403 when no token provided', async () => {
      const response = await request(BASE_URL)
        .put(`/items/${createdItemId}`)
        .send({ name: 'Updated Item' })
        .expect(403);

      expect(response.body).toHaveProperty('error');
    });

    it('should update item successfully with valid token', async () => {
      const updatedName = `Updated Item ${Date.now()}`;
      
      const response = await request(BASE_URL)
        .put(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: updatedName })
        .expect(200);

      expect(response.body).toHaveProperty('id', createdItemId);
      expect(response.body).toHaveProperty('name', updatedName);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(BASE_URL)
        .put('/items/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Item' })
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /items/:id', () => {
    let itemToDelete;

    beforeAll(async () => {
      const response = await request(BASE_URL)
        .post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: `Delete Test Item ${Date.now()}` });
      itemToDelete = response.body.id;
    });

    it('should return 403 when no token provided', async () => {
      const response = await request(BASE_URL)
        .delete(`/items/${itemToDelete}`)
        .expect(403);

      expect(response.body).toHaveProperty('error');
    });

    it('should delete item successfully with valid token', async () => {
      const response = await request(BASE_URL)
        .delete(`/items/${itemToDelete}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(BASE_URL)
        .delete('/items/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Integration Test', () => {
    it('should handle complete CRUD workflow', async () => {
      const itemName = `Integration Test Item ${Date.now()}`;
      
      // Create
      const createResponse = await request(BASE_URL)
        .post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: itemName })
        .expect(200);
      
      const itemId = createResponse.body.id;
      
      // Read
      const getResponse = await request(BASE_URL)
        .get('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      const createdItem = getResponse.body.find(item => item.id === itemId);
      expect(createdItem).toBeDefined();
      
      // Update
      const updatedName = `Updated ${itemName}`;
      await request(BASE_URL)
        .put(`/items/${itemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: updatedName })
        .expect(200);
      
      // Delete
      await request(BASE_URL)
        .delete(`/items/${itemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });
});