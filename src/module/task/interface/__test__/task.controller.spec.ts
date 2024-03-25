import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import * as request from 'supertest';

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

  describe('Authentication', () => {
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

  describe('Task Management', () => {
    describe('POST /tasks', () => {
      it('Adds a task for a logged-in user', async () => {
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
      });
    });

    describe('GET /tasks', () => {
      it('Gets tasks for a logged-in user', async () => {
        const response = await request(app.getHttpServer())
          .get('/tasks')
          .set('Authorization', `Bearer ${access_token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('tasks');
        expect(response.body).toHaveProperty('count', 1);
      });
    });

    describe('PUT /tasks', () => {
      it('Updates a task for a logged-in user', async () => {
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
      });
    });

    describe('DELETE /tasks/:id', () => {
      it('Deletes a task for a logged-in user', async () => {
        // Gets the updated task
        const getTask = await request(app.getHttpServer())
          .get('/tasks')
          .set('Authorization', `Bearer ${access_token}`);

        const taskToDelete = getTask.body.tasks[0];
        // Deletes task
        await request(app.getHttpServer())
          .delete(`/tasks/${taskToDelete.id}`)
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200);
      });
    });
  });
});
