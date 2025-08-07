const express = require('express');

const cors = require('cors');

function createApp() {

    const port = 3000;
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    let currentMove = "STAY";
    let currentAction = "NONE";

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/action', (req, res) => {
        res.json({
            "move": currentMove,
            "action": currentAction
        });
    });

    app.post('/set-move', (req, res) => {
        const { move } = req.body;
        currentMove = move;
        res.redirect('/');
    });

    app.post('/set-action', (req, res) => {
        const { action } = req.body;
        currentAction = action;
        res.redirect('/');
    });


    return app;
}

module.exports = createApp;