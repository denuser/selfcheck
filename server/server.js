const express = require('express');
const path = require('path');
const app = express();
const apiRouter = require("./apiRouter")

app.use(express.static(path.join(__dirname, '../build')));

app.use('/api', apiRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get("*",
    (req, res) => {
        res.send("404");
    });

app.listen(9000);