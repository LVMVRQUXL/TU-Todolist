const {describe, it, beforeEach} = require('mocha');
const request = require('supertest');

const {HttpCodeUtil, NumberUtil, ResponseUtil} = require('../../../src/utils');
const TaskService = require('../../../src/services').TaskService;

const BASE_URI = '/tasks';
const FAKE_TASK = {
    id: 1,
    content: 'test'
};
let sandbox = undefined;

let spyNumberUtilIsZero = undefined;
let spyResponseUtilNoContent = undefined;
let spyResponseUtilOk = undefined;

let stubTaskServiceFindAll = undefined;

/**
 * @param app {*}
 * @param currentSandbox {*}
 * @param methods {Object}
 */
const test = (app, currentSandbox, methods) => void describe(`GET ${BASE_URI}`, () => {
    sandbox = currentSandbox;

    beforeEach(() => {
        spyNumberUtilIsZero = sandbox.spy(NumberUtil, 'isZero');
        spyResponseUtilNoContent = sandbox.spy(ResponseUtil, 'noContent');
        spyResponseUtilOk = sandbox.spy(ResponseUtil, 'ok');

        stubTaskServiceFindAll = sandbox.stub(TaskService, 'findAll');
    });

    // noinspection JSUnresolvedFunction
    /**
     * @return {Promise<Object>}
     */
    const call = async () => await request(app).get(BASE_URI);

    /**
     * @param serviceResponse {Array<{id: number, content: string}>}
     */
    const checkServiceCallAndNoContent = (serviceResponse) => {
        sandbox.assert.calledOnce(stubTaskServiceFindAll);
        sandbox.assert.calledWithExactly(stubTaskServiceFindAll);
        sandbox.assert.calledOnce(spyNumberUtilIsZero);
        sandbox.assert.calledWithExactly(spyNumberUtilIsZero, serviceResponse.length);
    };

    const USEFUL_METHODS = Object.assign({call, checkServiceCallAndNoContent}, methods);

    shouldReturn_OkStatusCode_(USEFUL_METHODS);
    shouldReturn_NoContentStatusCode_(USEFUL_METHODS);
});

/**
 * @param methods {Object}
 *
 * @private
 */
const shouldReturn_OkStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.OK} and a singleton array of tasks`, async () => {
        // SETUP
        const tasks = [FAKE_TASK];
        const expectedResponse = {
            statusCode: HttpCodeUtil.OK,
            body: tasks
        };
        stubTaskServiceFindAll.resolves(tasks);

        // CALL
        const response = await methods.call();

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        methods.checkServiceCallAndNoContent(tasks);
        sandbox.assert.notCalled(spyResponseUtilNoContent);
        sandbox.assert.calledOnce(spyResponseUtilOk);
        methods.checkNoInternalSeverError();
    });

/**
 * @param methods {Object}
 *
 * @private
 */
const shouldReturn_NoContentStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.NO_CONTENT}`, async () => {
        // SETUP
        const tasks = [];
        const expectedResponse = {
            statusCode: HttpCodeUtil.NO_CONTENT,
            body: {}
        };
        stubTaskServiceFindAll.resolves(tasks);

        // CALL
        const response = await methods.call();

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        methods.checkServiceCallAndNoContent(tasks);
        sandbox.assert.calledOnce(spyResponseUtilNoContent);
        sandbox.assert.notCalled(spyResponseUtilOk);
        methods.checkNoInternalSeverError();
    });

exports.test = test;
