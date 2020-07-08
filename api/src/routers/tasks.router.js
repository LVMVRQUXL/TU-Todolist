const router = require('express').Router();
const bodyParser = require('body-parser');

const TaskController = require('../controllers').TaskController;

/**
 * TODO: integration tests
 * @swagger
 *
 * '/tasks/{id}':
 *   put:
 *     description: Update one task from id
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         description: Task's id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Can't find task from id
 *       500:
 *         description: An internal server error has occurred
 */
router.put('/:id', bodyParser.json(), TaskController.updateOneTaskFromId);

/**
 * @swagger
 *
 * '/tasks/{id}':
 *   delete:
 *     description: Remove one task from id
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         description: Task's id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Can't find task from id
 *       500:
 *         description: An internal server error has occurred
 */
router.delete('/:id', TaskController.removeOneTaskFromId);

/**
 * @swagger
 *
 * '/tasks/{id}':
 *   get:
 *     description: Get one task from id
 *     tags:
 *       - Tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Task's id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Can't find task from id
 *       500:
 *         description: An internal server error has occurred
 */
router.get('/:id', TaskController.findOneTaskFromId);

/**
 * @swagger
 *
 * '/tasks':
 *   get:
 *     description: Get all tasks
 *     tags:
 *       - Tasks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *       204:
 *         description: No tasks to return
 *       500:
 *         description: An internal server error has occurred
 */
router.get('/', TaskController.findAllTasks);

/**
 * @swagger
 *
 * '/tasks':
 *   post:
 *     description: Create a new task
 *     tags:
 *       - Tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: content
 *         description: Task's content
 *         in: body
 *         required: true
 *     responses:
 *       201:
 *         description: New task successfully created
 *       400:
 *         description: Invalid content
 *       409:
 *         description: A conflict has occurred
 *       500:
 *         description: An internal server error has occurred
 */
router.post('/', bodyParser.json(), TaskController.createTask);

module.exports = router;
