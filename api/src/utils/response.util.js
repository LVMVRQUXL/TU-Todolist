const HttpCodeUtil = require('./http_code.util');

class ResponseUtil {
    /**
     * @param response {object}
     */
    badRequest(response) {
        _end(_setCode(response, HttpCodeUtil.BAD_REQUEST));
    }

    /**
     * @param response {object}
     */
    conflict(response) {
        _end(_setCode(response, HttpCodeUtil.CONFLICT));
    }

    /**
     * @param response {object}
     */
    internalServerError(response) {
        _end(_setCode(response, HttpCodeUtil.INTERNAL_SERVER_ERROR));
    }

    /**
     * @param response {object}
     */
    noContent(response) {
        _end(_setCode(response, HttpCodeUtil.NO_CONTENT));
    }

    /**
     * @param response {object}
     */
    notFound(response) {
        _end(_setCode(response, HttpCodeUtil.NOT_FOUND));
    }

    /**
     * @param response {object}
     * @param [data] {*}
     */
    ok(response, data) {
        response = _setCode(response, HttpCodeUtil.OK);
        if (!data) {
            _end(response);
        } else {
            _endWithJSON(response, data);
        }
    }
}

/**
 * @param response {object}
 *
 * @private
 */
const _end = (response) => {
    response.end();
};

/**
 * @param response {object}
 * @param jsonData {*}
 *
 * @private
 */
const _endWithJSON = (response, jsonData) => {
    response.json(jsonData);
};

/**
 * @param response {object}
 * @param code {number}
 *
 * @returns {object}
 *
 * @private
 */
const _setCode = (response, code) => {
    response.status(code);
    return response;
};

module.exports = new ResponseUtil();