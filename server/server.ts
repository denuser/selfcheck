import * as express from "express";
import * as path from 'path';
import apiRouter from "./apiRouter"
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as winston from "winston"
import auth from "./auth-service"
import indexTemplate from "./templates/index"
import { Int32 } from "bson";

const app = express();
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

app.use('/api', apiRouter(logger));

app.get('/oauth2callback', async (req, res) => {
    //TODO
    const p: Int32 = 1;
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