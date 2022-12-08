import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/auth/signup (Post) Signup new User', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: '',
        lastName: 'lastname',
        email: 'testuser@email.com',
        password: '1234567',
      })
      .expect(400);
  });

  it('/auth/signup (Post) Signup new User', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'name',
        lastName: 'lastname',
        email: 'testuser@email.com',
        password: '1234567',
      })
      .expect(201);
  });
});
