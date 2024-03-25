import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('AuthController tests', () => {
  let app: INestApplication;

  let access_token = '';
  let cookieWithRefreshToken = '';
  const user = {
    name: 'name',
    lastName: 'lastname',
    email: 'testuser@email.com',
    password: '1234567',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    // Resets db
    await request(app.getHttpServer()).get('/auth/resetdb').expect(200);
    // Registers new User
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201);
    // Logs new User
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201);

    access_token = response.body.access_token;
    cookieWithRefreshToken = response.get('Set-Cookie')[0].split(';')[0];
  });

  describe('POST /auth ', () => {
    it('Signup with blank fields', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ name: '', lastName: '', email: '', password: user.password })
        .expect(400);
    });

    it('Signup existent user', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: user.email, password: user.password })
        .expect(400);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: '' })
        .expect(400);
    });

    it('Login with blank field', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: '', password: user.password })
        .expect(400);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: '' })
        .expect(400);
    });
  });

  describe('GET /auth/session', () => {
    it('Gets new access token with refresh token', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/session')
        .set('Cookie', `${cookieWithRefreshToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
    });
  });
});
