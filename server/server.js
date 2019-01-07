const express = require('express');
const path = require('path');
const app = express();
const apiRouter = require("./apiRouter")
const bodyParser = require('body-parser')
const session = require('express-session')
const winston = require("winston")
const auth = require("./auth-service")
const indexTemplate = require("./templates/index")

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

app.use(session({
    secret: 'keyboard cat',
    cookie: { secure: true, maxAge: 60000, },
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../build')));

app.use('/api', new apiRouter(logger));

app.get('/oauth2callback', async (req, res) => {
    //TODO
    const tokens = await auth.getTokensByCode(req.url)
    await auth.saveTokens(tokens);
    res.redirect("/")
});

app.get('/*', function (req, res) {
    req.session.aha = "123123123123123"
    const url = auth.getLoginUrl();
    //TODO: pass to client?
    res.send(indexTemplate({ loginUrl: url, isLoggedIn: false }));
});

app.get("*",
    (req, res) => {
        res.send("404");
    });

app.listen(9000);