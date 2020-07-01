const {Task} = require('../models');

class TaskService {
    /**
     * @param values {object}
     *
     * @returns {Promise<TaskDTO|undefined>}
     */
    async create(values) {
        const createdTask = await Task.create(values);

        return createdTask ? this.mapToDTO(createdTask) : undefined;
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
     * @returns {Promise<TaskDTO[]>}
     */
    async findAll() {
        const tasks = Task.findAll();

        return tasks.map(task => this.mapToDTO(task));
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
