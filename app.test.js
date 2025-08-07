const request = require('supertest');
const createApp = require('./app/server.js');

describe('Bot API Routes', () => {
    let app;

    beforeEach(() => {
        app = createApp();
    });

    test('GET /action returns default value', async () => {
        const response = await request(app)
            .get('/action')
            .expect(200);

        expect(response.body.move).toBe('STAY');
        expect(response.body.action).toBe('NONE');
    });

    test('POST /set-move changes the move', async () => {
        await request(app)
            .post('/set-move')
            .send({ move: 'UP' })


        const response = await request(app)
            .get('/action')
            .expect(200);

        expect(response.body.move).toBe('UP');
    });

    test('POST /set-action changes the action', async () => {
        await request(app)
            .post('/set-action')
            .send({ action: 'COLLECT' })


        const response = await request(app)
            .get('/action')
            .expect(200);

        expect(response.body.action).toBe('COLLECT');
    });

    test('change both action and move', async () => {
        await request(app)
            .post('/set-move')
            .send({ move: 'DOWN' })


        await request(app)
            .post('/set-action')
            .send({ action: 'BOMB' })


        const response = await request(app)
            .get('/action')
            .expect(200);

        expect(response.body.move).toBe('DOWN');
        expect(response.body.action).toBe('BOMB');
    });
});