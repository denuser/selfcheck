import * as express from "express";
import * as path from 'path';
import apiRouter from "./apiRouter"
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import { createLogger, format, transports } from "winston"
import auth from "./auth-service"
import indexTemplate from "./templates/index"
import { Int32 } from "bson";
import * as uniqid from "uniqid"

const app = express();
const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.File({ filename: path.resolve(__dirname, '../logs/error.log'), level: 'error' }),
        new transports.File({ filename: path.resolve(__dirname, '../logs/combined.log') })
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
    const tokens = await auth.getTokensByCode(req.url)
    await auth.saveTokens(tokens);
    const sessionId = uniqid();
    req.session.sessionId = sessionId
    await auth.saveSession(tokens.userId, sessionId)
    res.redirect("/")
});

app.get('/*', async (req, res) => {
    const { sessionId } = req.session
    if (sessionId && sessionId != '') {
        const session = await auth.tryGetSession(sessionId)
    }


    const url = auth.getLoginUrl();
    //TODO: pass to client?
    res.send(indexTemplate({ loginUrl: url, isLoggedIn: false }));
});

app.get("*",
    (req, res) => {
        res.send("404");
    });

app.listen(9000);
