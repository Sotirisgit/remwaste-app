const request = require('supertest');

const BASE_URL = 'https://remwastebackend.onrender.com';

describe('Authentication API Tests', () => {
  describe('POST /login', () => {
    it('should login successfully with valid credentials', async () => {
      const response = await request(BASE_URL)
        .post('/login')
        .send({
          username: 'remwaste',
          password: '12345'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.length).toBeGreaterThan(0);
    });

    it('should return 401 for invalid username', async () => {
      const response = await request(BASE_URL)
        .post('/login')
        .send({
          username: 'invaliduser',
          password: '12345'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('User not found');
    });

    it('should return 401 for invalid password', async () => {
      const response = await request(BASE_URL)
        .post('/login')
        .send({
          username: 'remwaste',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid password');
    });

    it('should return 400 for missing username', async () => {
      const response = await request(BASE_URL)
        .post('/login')
        .send({
          password: '12345'
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for missing password', async () => {
      const response = await request(BASE_URL)
        .post('/login')
        .send({
          username: 'remwaste'
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for empty request body', async () => {
      const response = await request(BASE_URL)
        .post('/login')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for malformed JSON', async () => {
      const response = await request(BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);
    });
  });
});