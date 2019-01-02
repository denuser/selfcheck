const express = require('express');
const path = require('path');
const app = express();
const apiRouter = require("./apiRouter")
const bodyParser = require('body-parser')
const winston = require("winston")

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: path.resolve(__dirname, '../logs/error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.resolve(__dirname, '../logs/combined.log') })
    ]
});

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../build')));

app.use('/api', new apiRouter(logger));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get("*",
    (req, res) => {
        res.send("404");
    });

app.listen(9000);