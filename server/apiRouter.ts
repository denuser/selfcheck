import { Router } from "express"
import winston = require("winston");

const apiRouter = Router();
let logger: winston.Logger;

const withErrorHandler = (res, action) => {
    try {
        action();
    }
    catch (ex) {
        logger.log({
            date: new Date(),
            level: 'error',
            message: ex.toString()
        });
        res.status(500).send("Internal server error");
    }
}

function router(loggerInstance: winston.Logger) {
    logger = loggerInstance;

    apiRouter.use(function timeLog(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        next();
    });

    apiRouter.get("/",
        (req, res) => {

            res.send(JSON.stringify({ a: 4 }, null, 3));
        });

    apiRouter.get("/tasks",
        // TODO: paging?
        async (req, res) => {
            withErrorHandler(res, async () => {
                // const tasks = await client.getTasks()
                // res.send(JSON.stringify(tasks));
            });
        });

    apiRouter.get("/tasks/:id",
        async (req, res) => {
            withErrorHandler(res, async () => {
                const { id } = req.params
                // const task = await client.getTask(id)
                // res.send(JSON.stringify(task));
            });
        });

    apiRouter.post("/tasks",
        async (req, res) => {
            withErrorHandler(res, async () => {
                const task = req.body;
                // const createdTask = await client.insertTask(task)
                // res.send(JSON.stringify(createdTask));
            })
        });

    apiRouter.get("*",
        (req, res) => {
            res.send("404");
        });

    return apiRouter
}

export default router
