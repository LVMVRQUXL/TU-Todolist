const TaskService = require('../services').TaskService;

class TaskController {
    /**
     * Create a new task
     *
     * @param task {object}
     *
     * @returns {Promise<TaskDTO|undefined>}
     */
    async createTask(task) {
        const createdTask = await TaskService.create(task);

        return createdTask ? TaskService.mapToDTO(createdTask) : undefined;
    }
}

module.exports = new TaskController();
