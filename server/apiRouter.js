const { Router } = require("express")

const apiRouter = Router();

apiRouter.get("/",
    (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ a: 4 }, null, 3));
    });

apiRouter.get("/tasks",
    (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(["task 1", "task 2"], null, 3));
    });

apiRouter.get("*",
    (req, res) => {
        res.send("404");
    });

module.exports = apiRouter
