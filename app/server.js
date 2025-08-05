const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});