const router = require('express').Router();
const bodyParser = require('body-parser');

const HttpCodeUtil = require('../utils').HttpCodeUtil;
const TaskController = require('../controllers').TaskController;

const notImplementedMiddleware = (req, res) => res.status(HttpCodeUtil.NOT_IMPLEMENTED).end();

// TODO: PUT '/tasks/{id}' => Update one task from id
router.put('/:id', notImplementedMiddleware);

// TODO: DELETE '/tasks/{id}' => Remove one task from id
router.delete('/:id', notImplementedMiddleware);

// TODO: GET '/tasks/{id}' => Get one task from id
router.get('/:id', notImplementedMiddleware);

// GET '/tasks' => Get all tasks
// TODO: Swagger documentation
router.get('/', TaskController.findAllTasks);

// POST '/tasks' => Create a new task
// TODO: Swagger documentation
router.post('/', bodyParser.json(), TaskController.createTask);

module.exports = router;