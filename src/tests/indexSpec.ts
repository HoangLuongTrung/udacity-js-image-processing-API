import supertest from 'supertest';
import app from '../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);
describe('There is at least one test per endpoint', (): void => {
  describe('endpoint: /', (): void => {
    it('get /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('get /api/images?filename=encenadaport&width=200&height=200', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(200);
    });

    it('get /api/images with no params', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /a', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/a');

      expect(response.status).toBe(404);
    });
  });
});
