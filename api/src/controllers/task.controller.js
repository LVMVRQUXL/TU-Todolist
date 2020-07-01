const {HttpCodeUtil, StringUtil} = require('../utils');
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
                response.status(HttpCodeUtil.BAD_REQUEST).end();
            } else {
                const taskDTO = await TaskService.create(task);
                if (!taskDTO) {
                    response.status(HttpCodeUtil.CONFLICT).end();
                } else {
                    response.status(HttpCodeUtil.OK).json(taskDTO);
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
            if (taskDTOS.length === 0) {
                response.status(HttpCodeUtil.NO_CONTENT).end();
            } else {
                response.status(HttpCodeUtil.OK).json(taskDTOS);
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
    response.status(HttpCodeUtil.INTERNAL_SERVER_ERROR).end();
};

module.exports = new TaskController();