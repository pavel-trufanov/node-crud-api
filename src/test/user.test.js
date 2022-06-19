import http from 'http';
import dotenv from "dotenv";
import {route} from "../router/router.js";
import supertest from "supertest";

let server;

const API_PATH = '/api/users';

beforeAll(async () => {
    dotenv.config();
    server = await http.createServer((req, res) => {
        route(req, res);
    });
    server.listen(process.env.TEST_PORT)
});

afterAll( () => {
    server.close();
});

test('test GET/POST/UPDATE/DELETE happy flow', async () => {
    const get = await supertest(server)
        .get(API_PATH)
        .expect('Content-Type', /json/)
        .expect(200);

    expect(get.body).toEqual([]);

    await supertest(server)
        .post(API_PATH)
        .send({
            username: 'User Name',
            age: 36,
            hobbies: ['programming', 'music', 'cycling', 'snowboarding']
        })
        .expect(201);

    const getCreated = await supertest(server)
        .get(API_PATH)
        .expect('content-type', /json/)
        .expect(200);

    expect(getCreated.body[0].username).toEqual('User Name');
    const id = getCreated.body[0].id;

    await supertest(server)
        .put(`${API_PATH}/${id}`)
        .send({username: 'new user'})
        .expect(200);

    const getUpdated = await supertest(server)
        .get('/api/users')
        .expect('content-type', /json/)
        .expect(200);

    expect(getUpdated.body[0].username).toEqual('new user');

    await supertest(server)
        .delete(`${API_PATH}/${id}`)
        .expect(204);

    await supertest(server)
        .get(`${API_PATH}/${id}`)
        .expect(404);
});

test('test GET/POST/UPDATE/DELETE negative flow', async () => {
    await supertest(server)
        .post(API_PATH)
        .send({
            username: 'User Name',
            age: 36,
            hobbies: ['programming', 'music', 'cycling', 'snowboarding']
        })
        .expect(201);

    //Test wrong id passed
    await supertest(server)
        .get(`${API_PATH}/${123}`)
        .expect(400);

    //Test user not found
    await supertest(server)
        .get(`${API_PATH}/3f963eb0-edb4-11ec-b19a-4d3d05379a01`)
        .expect(404);

    //Test missing required fields
    await supertest(server)
        .post(API_PATH)
        .send({
            age: 36,
            hobbies: ['programming', 'music', 'cycling', 'snowboarding']
        })
        .expect(400);

    //Test wrong id updated
    await supertest(server)
        .put(`${API_PATH}/${123}`)
        .send({username: 'new user'})
        .expect(400);

    //Test user not found during update
    await supertest(server)
        .put(`${API_PATH}/3f963eb0-edb4-11ec-b19a-4d3d05379a01`)
        .send({username: 'new user'})
        .expect(404);

    //Test wrong id deleted
    await supertest(server)
        .delete(`${API_PATH}/${123}`)
        .expect(400);
});

test('test invalid url and request', async () => {
    await supertest(server)
        .post(API_PATH)
        .send({
            username: 'User Name',
            age: 36,
            hobbies: ['programming', 'music', 'cycling', 'snowboarding']
        })
        .expect(201);

    const getCreated = await supertest(server)
        .get(API_PATH)
        .expect('content-type', /json/)
        .expect(200);

    expect(getCreated.body[0].username).toEqual('User Name');
    const id = getCreated.body[0].id;

    //Test get users from wrong url
    await supertest(server)
        .get('/users')
        .expect(404);

    //Test get user by id from wrong url
    await supertest(server)
        .get(`/users/${id}`)
        .expect(404);

    //Test post user wrong url
    await supertest(server)
        .post('/api/user')
        .send({
            username: 'User Name',
            age: 36,
            hobbies: ['programming', 'music', 'cycling', 'snowboarding']
        })
        .expect(404);

    //Test post wrong json
    await supertest(server)
        .post(API_PATH)
        .send({
            month: 'June'
        })
        .expect(400);

    //Test update user wrong path
    await supertest(server)
        .put(`/${id}`)
        .send({username: 'new user'})
        .expect(404);

    //Test remove user wrong path
    await supertest(server)
        .delete(`/api/${id}`)
        .expect(404);
});

