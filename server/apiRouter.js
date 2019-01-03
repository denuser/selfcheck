const { Router } = require("express")
const DatabaseClient = require("./mongo-client")
const stringifyObject = require('stringify-object');

const apiRouter = Router();
const client = new DatabaseClient();
let logger;

const withErrorHandler = (action) => {
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

function router(loggerInstance) {
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
            withErrorHandler(async () => {
                const tasks = await client.getTasks()
                res.send(JSON.stringify(tasks));
            });
        });

    apiRouter.get("/tasks/:id",
        async (req, res) => {
            withErrorHandler(async () => {
                const { id } = req.params
                const task = await client.getTask(id)
                res.send(JSON.stringify(task));
            });
        });

    apiRouter.post("/tasks",
        async (req, res) => {
            withErrorHandler(async () => {
                const task = req.body;
                const createdTask = await client.insertTask(task)
                res.send(JSON.stringify(createdTask));
            })
        });

    apiRouter.get("*",
        (req, res) => {
            res.send("404");
        });

    return apiRouter
}

module.exports = router
