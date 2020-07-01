const bodyParser = require('body-parser');

const endpoints = require('./endpoints').TaskEndpoints;
const httpCodeUtil = require('../utils').HttpCodeUtil;

module.exports = (app) => {
    // TODO: PUT '/tasks/{id}' => Update one task from id
    app.put(endpoints.TasksId, bodyParser.json(), async (req, res) => {
        res.status(httpCodeUtil.NOT_IMPLEMENTED).end();
    });

    // TODO: DELETE '/tasks/{id}' => Remove one task from id
    app.delete(endpoints.TasksId, async (req, res) => {
        res.status(httpCodeUtil.NOT_IMPLEMENTED).end();
    });

    // TODO: GET '/tasks/{id}' => Get one task from id
    app.get(endpoints.TasksId, async (req, res) => {
        res.status(httpCodeUtil.NOT_IMPLEMENTED).end();
    });

    // TODO: GET '/tasks' => Get all tasks
    app.get(endpoints.Tasks, async (req, res) => {
        res.status(httpCodeUtil.NOT_IMPLEMENTED).end();
    });

    // TODO: POST '/tasks' => Create a new task
    app.post(endpoints.Tasks, bodyParser.json(), async (req, res) => {
        res.status(httpCodeUtil.NOT_IMPLEMENTED).end();
    });
};
