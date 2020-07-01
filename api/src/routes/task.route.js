const bodyParser = require('body-parser');

const endpoints = require('./endpoints').TaskEndpoints;
const {HttpCodeUtil, ValidatorUtil} = require('../utils');
const TaskController = require('../controllers').TaskController;

module.exports = (app) => {
    // TODO: PUT '/tasks/{id}' => Update one task from id
    app.put(endpoints.TasksId, bodyParser.json(), async (req, res) => {
        res.status(HttpCodeUtil.NOT_IMPLEMENTED).end();
    });

    // TODO: DELETE '/tasks/{id}' => Remove one task from id
    app.delete(endpoints.TasksId, async (req, res) => {
        res.status(HttpCodeUtil.NOT_IMPLEMENTED).end();
    });

    // TODO: GET '/tasks/{id}' => Get one task from id
    app.get(endpoints.TasksId, async (req, res) => {
        res.status(HttpCodeUtil.NOT_IMPLEMENTED).end();
    });

    // TODO: GET '/tasks' => Get all tasks
    app.get(endpoints.Tasks, async (req, res) => {
        res.status(HttpCodeUtil.NOT_IMPLEMENTED).end();
    });

    // POST '/tasks' => Create a new task
    // TODO: Swagger documentation
    app.post(endpoints.Tasks, bodyParser.json(), async (req, res) => {
        try {
            const task = {content: req.body.content};
            if (!ValidatorUtil.isValidString(task.content)) {
                res.status(HttpCodeUtil.BAD_REQUEST).end();
            } else {
                const taskDTO = await TaskController.createTask(task);
                if (!taskDTO) {
                    res.status(HttpCodeUtil.CONFLICT).end();
                } else {
                    res.status(HttpCodeUtil.OK).json(taskDTO);
                }
            }
        } catch (e) {
            console.error(e);
            res.status(HttpCodeUtil.INTERNAL_SERVER_ERROR).end();
        }
    });
};
