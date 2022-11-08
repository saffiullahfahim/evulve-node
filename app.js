const express = require('express');
const path = require('path');
const createError = require('http-errors');

// initialize the express app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// 404 not found handler
function notFoundHandler(req, res, next) {
    next(createError(404, 'Your requested content was not found!'));
}
app.get('/ip', async (req, res) => {
    const ip = await fetch('https://checkip.amazonaws.com/');
    res.send(await ip.text());
});

app.use(notFoundHandler);
app.listen(80, () => {
    console.log(`server is run on port ${80}`);
});
