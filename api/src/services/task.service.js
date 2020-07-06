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
        const tasks = await Task.findAll();

        // noinspection JSCheckFunctionSignatures
        return tasks.map(task => this.mapToDTO(task));
    }

    /**
     * @param where {object}
     *
     * @returns {Promise<TaskDTO|undefined>}
     * TODO: unit tests
     */
    async findOne(where) {
        const task = await Task.findOne({where: where});

        return task ? this.mapToDTO(task) : undefined;
    }

    /**
     * @param task {Task}
     *
     * @returns {TaskDTO}
     */
    mapToDTO(task) {
        return new TaskDTO(task);
    }

    /**
     * @param values {object}
     * @param where {object}
     *
     * @returns {Promise<void>}
     * TODO: unit tests
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
