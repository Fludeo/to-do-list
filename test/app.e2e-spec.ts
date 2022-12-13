import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let access_token = '';
  let cookieWithRefreshToken = '';
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
    cookieWithRefreshToken = response.get('Set-Cookie')[0].split(';')[0];
  });

  it('/auth/signup (Post) Signup with blank fields', async () => {
    // Logs new User
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ name: '', lastName: '', email: '', password: user.password })
      .expect(400);
  });
  it('/auth/signup (Post) Signup existent user', async () => {
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

  it('/tasks (Get)  Adds and gets a task from logged User ', async () => {
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

  it('/tasks (Update)  Adds and updates a task to logged User ', async () => {
    const task = {
      title: 'Test task',
      description: 'task description',
      date: new Date().toDateString(),
      priority: 5,
    };
    // Adds a new task
    await request(app.getHttpServer())
      .post('/tasks')
      .send(task)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(201);

    // Gets the task

    const getRequest = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${access_token}`);

    // Updates recently created task
    const updatedTask = await getRequest.body.tasks[0];
    updatedTask.title = 'updated title';
    await request(app.getHttpServer())
      .put('/tasks')
      .send(updatedTask)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
    // Gets the updated task
    const getUpdatedTask = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(getUpdatedTask.body).toHaveProperty('tasks', [updatedTask]);
  });

  it('/tasks (Delete)  Adds and deletes a task from logged User ', async () => {
    const task = {
      title: 'Test task',
      description: 'task description',
      date: new Date().toDateString(),
      priority: 5,
    };
    //Adds task
    await request(app.getHttpServer())
      .post('/tasks')
      .send(task)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(201);

    // Gets the updated task
    const getTask = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    const taskToDelete = getTask.body.tasks[0];
    // Deletes task
    await request(app.getHttpServer())
      .delete(`/tasks/${taskToDelete.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
  });

  it('/auth/session (Get)  Gets new access token with refresh token ', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/session')
      .set('Cookie', `${cookieWithRefreshToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
  });
});
