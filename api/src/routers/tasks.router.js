const router = require('express').Router();
const bodyParser = require('body-parser');

const TaskController = require('../controllers').TaskController;

// PUT '/tasks/{id}' => Update one task from id
// TODO: Swagger documentation
router.put('/:id', bodyParser.json(), TaskController.updateOneTaskFromId);

// DELETE '/tasks/{id}' => Remove one task from id
// TODO: Swagger documentation
router.delete('/:id', TaskController.removeOneTaskFromId);

// GET '/tasks/{id}' => Get one task from id
// TODO: Swagger documentation
router.get('/:id', TaskController.findOneTaskFromId);

// GET '/tasks' => Get all tasks
// TODO: Swagger documentation
router.get('/', TaskController.findAllTasks);

// POST '/tasks' => Create a new task
// TODO: Swagger documentation
router.post('/', bodyParser.json(), TaskController.createTask);

module.exports = router;