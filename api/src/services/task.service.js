const {Task} = require('../models');

class TaskService {
    /**
     * Create a task with given values
     *
     * @param values {object}
     *
     * @returns {Promise<Task>}
     */
    async create(values) {
        return Task.create(values);
    }

    /**
     * Remove one task corresponding to given where clause
     *
     * @param where {object}
     *
     * @returns {Promise<void>}
     */
    async destroy(where) {
        await Task.destroy({where: where});
    }

    /**
     * Find all tasks
     *
     * @returns {Promise<Task[]>}
     */
    async findAll() {
        return Task.findAll();
    }

    /**
     * Find one task corresponding to given where clause
     *
     * @param where {object}
     *
     * @returns {Promise<Task|null>}
     */
    async findOne(where) {
        return Task.findOne({where: where});
    }

    /**
     * Map given task to DTO
     *
     * @param task {Task}
     *
     * @returns {TaskDTO}
     */
    mapToDTO(task) {
        return new TaskDTO(task);
    }

    /**
     * Update one task corresponding to where clause
     *
     * @param values {object}
     * @param where {object}
     *
     * @returns {Promise<void>}
     */
    async update(values, where) {
        await Task.update(values, {where: where});
    }
}

class TaskDTO {
    constructor(task) {
        this.id = parseInt(task.id);
        this.content = task.content;
    }
}

module.exports = new TaskService();
