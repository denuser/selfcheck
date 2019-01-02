const { Router } = require("express")
const DatabaseClient = require("./mongo-client")
const stringifyObject = require('stringify-object');

const apiRouter = Router();
const client = new DatabaseClient();
let logger;

function router(loggerInstance) {
    logger = loggerInstance;

    apiRouter.get("/",
        (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ a: 4 }, null, 3));
        });

    apiRouter.get("/tasks",
        (req, res) => {
            const tasks = client.getTasks();
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(["task 1", "task 2"], null, 3));
        });

    apiRouter.post("/tasks",
        async (req, res) => {
            const task = req.body;
            try {
                const createdTask = await client.insertTask(task)
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(createdTask));
            }
            catch (ex) {
                logger.log({
                    date: new Date(),
                    level: 'error',
                    message: ex.toString()
                });
                res.status(500).send("Internal server error");
            }
        });

    apiRouter.get("*",
        (req, res) => {
            res.send("404");
        });

    return apiRouter
}

module.exports = router
