const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/action', (req, res) => {
    const moves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
    const actions = ["COLLECT", "BOMB", "NONE"];

    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    res.json({
        "move": randomMove,
        "action": randomAction
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
