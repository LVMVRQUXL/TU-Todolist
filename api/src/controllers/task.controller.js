const {NumberUtil, ResponseUtil, StringUtil} = require('../utils');
const TaskService = require('../services').TaskService;

class TaskController {
    /**
     * @param request {object}
     * @param response {object}
     *
     * @returns {Promise<void>}
     */
    async createTask(request, response) {
        try {
            const task = {content: request.body.content};
            if (StringUtil.isEmpty(task.content)) {
                ResponseUtil.badRequest(response);
            } else {
                const taskDTO = await TaskService.create(task);
                if (!taskDTO) {
                    ResponseUtil.conflict(response);
                } else {
                    ResponseUtil.created(response, taskDTO);
                }
            }
        } catch (error) {
            _handleError(error, response);
        }
    }

    /**
     * @param request {object}
     * @param response {object}
     *
     * @returns {Promise<void>}
     */
    async findAllTasks(request, response) {
        try {
            const taskDTOS = await TaskService.findAll();
            if (NumberUtil.isZero(taskDTOS.length)) {
                ResponseUtil.noContent(response);
            } else {
                ResponseUtil.ok(response, taskDTOS);
            }
        } catch (error) {
            _handleError(error, response);
        }
    }

    /**
     * @param request {object}
     * @param response {object}
     *
     * @returns {Promise<void>}
     */
    async findOneTaskFromId(request, response) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id) || !NumberUtil.isPositiveStrict(id)) {
                ResponseUtil.badRequest(response);
            } else {
                const where = {id: id};
                const taskDTO = await TaskService.findOne(where);
                if (!taskDTO) {
                    ResponseUtil.notFound(response);
                } else {
                    ResponseUtil.ok(response, taskDTO);
                }
            }
        } catch (error) {
            _handleError(error, response);
        }
    }

    /**
     * @param request {object}
     * @param response {object}
     *
     * @returns {Promise<void>}
     */
    async removeOneTaskFromId(request, response) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id) || !NumberUtil.isPositiveStrict(id)) {
                ResponseUtil.badRequest(response);
            } else {
                const where = {id: id};
                const taskDTO = await TaskService.findOne(where);
                if (!taskDTO) {
                    ResponseUtil.notFound(response);
                } else {
                    await TaskService.destroy(where);
                    ResponseUtil.ok(response);
                }
            }
        } catch (error) {
            _handleError(error, response);
        }
    }

    /**
     * @param request {object}
     * @param response {object}
     *
     * @returns {Promise<void>}
     */
    async updateOneTaskFromId(request, response) {
        try {
            const values = {
                id: parseInt(request.params.id),
                content: request.body.content
            };
            if (isNaN(values.id) || !NumberUtil.isPositiveStrict(values.id) || StringUtil.isEmpty(values.content)) {
                ResponseUtil.badRequest(response);
            } else {
                const where = {id: values.id};
                const taskDTO = await TaskService.findOne(where);
                if (!taskDTO) {
                    ResponseUtil.notFound(response);
                } else {
                    await TaskService.update(values, where);
                    ResponseUtil.ok(response);
                }
            }
        } catch (error) {
            _handleError(error, response);
        }
    }
}

/**
 * @param error {object}
 * @param response {object}
 *
 * @private
 */
const _handleError = (error, response) => {
    console.error(error);
    ResponseUtil.internalServerError(response);
};

module.exports = new TaskController();
