import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let access_token = '';
  const refresh_token = '';
  const user = {
    name: 'name',
    lastName: 'lastname',
    email: 'testuser@email.com',
    password: '1234567',
  };

  beforeEach(async () => {
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
  });

  it('/auth/signup (Post) Signup with blank fields', async () => {
    // Logs new User
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ name: '', lastName: '', email: '', password: user.password })
      .expect(400);
  });
  it('/auth/Signup (Post) Signup existent user', async () => {
    // Logs new User
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: user.email, password: user.password })
      .expect(400);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: '' })
      .expect(400);
  });

  it('/auth/login (Post) Login with blank field', async () => {
    // Logs new User
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: '', password: user.password })
      .expect(400);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: '' })
      .expect(400);
  });

  it('/tasks (Post and Get)  Adds and gets a task from logged User ', async () => {
    const task = {
      title: 'Test task',
      description: 'task description',
      date: new Date().toDateString(),
      priority: 5,
    };
    await request(app.getHttpServer())
      .post('/tasks')
      .send(task)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('tasks');
    expect(response.body).toHaveProperty('count', 1);
  });
});
