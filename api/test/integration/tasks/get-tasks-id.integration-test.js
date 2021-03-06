const {describe, it, beforeEach} = require('mocha');
const request = require('supertest');

const {HttpCodeUtil, NumberUtil, ResponseUtil} = require('../../../src/utils');
const TaskService = require('../../../src/services').TaskService;

const FAKE_TASK = {
    id: 1,
    content: 'test'
};
const BASE_URI = '/tasks';
const URI_MODEL = `/tasks/:id`;

let sandbox = undefined;

let spyNumberUtilIsPositiveStrict = undefined;
let spyResponseUtilBadRequest = undefined;
let spyResponseUtilNotFound = undefined;
let spyResponseUtilOk = undefined;

let stubTaskServiceFindOne = undefined;

/**
 * @param app {*}
 * @param currentSandbox {*}
 * @param methods {Object}
 */
const test = (app, currentSandbox, methods) => void describe(`GET ${URI_MODEL}`, () => {
    sandbox = currentSandbox;

    beforeEach(() => {
        spyNumberUtilIsPositiveStrict = sandbox.spy(NumberUtil, 'isPositiveStrict');
        spyResponseUtilBadRequest = sandbox.spy(ResponseUtil, 'badRequest');
        spyResponseUtilNotFound = sandbox.spy(ResponseUtil, 'notFound');
        spyResponseUtilOk = sandbox.spy(ResponseUtil, 'ok');

        stubTaskServiceFindOne = sandbox.stub(TaskService, 'findOne');
    });

    // noinspection JSUnresolvedFunction
    /**
     * @param taskId {number}
     *
     * @return {Promise<*>}
     */
    const call = async (taskId) => await request(app).get(`${BASE_URI}/${taskId.toString()}`);

    const USEFUL_METHODS = Object.assign({call}, methods);

    shouldReturn_OkStatusCode_(USEFUL_METHODS);
    shouldReturn_BadRequestStatusCode_(USEFUL_METHODS);
    shouldReturn_NotFoundStatusCode_(USEFUL_METHODS);
});

/**
 * @param methods {Object}
 *
 * @private
 */
const shouldReturn_OkStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.OK} and one task`, async () => {
        // SETUP
        const sendTaskId = FAKE_TASK.id;
        const expectedResponse = {
            statusCode: HttpCodeUtil.OK,
            body: FAKE_TASK
        };
        stubTaskServiceFindOne.resolves(FAKE_TASK);

        // CALL
        const response = await methods.call(sendTaskId);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        sandbox.assert.calledOnce(spyNumberUtilIsPositiveStrict);
        sandbox.assert.calledWithExactly(spyNumberUtilIsPositiveStrict, sendTaskId);
        sandbox.assert.notCalled(spyResponseUtilBadRequest);
        sandbox.assert.calledOnce(stubTaskServiceFindOne);
        sandbox.assert.calledWithExactly(stubTaskServiceFindOne, {id: sendTaskId});
        sandbox.assert.notCalled(spyResponseUtilNotFound);
        sandbox.assert.calledOnce(spyResponseUtilOk);
        methods.checkNoInternalSeverError();
    });

/**
 * @param methods {Object}
 *
 * @private
 */
const shouldReturn_BadRequestStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.BAD_REQUEST}`, async () => {
        // SETUP
        const sendTaskId = 'zeg';
        const expectedResponse = {
            statusCode: HttpCodeUtil.BAD_REQUEST,
            body: {}
        };

        // CALL
        const response = await methods.call(sendTaskId);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        sandbox.assert.notCalled(spyNumberUtilIsPositiveStrict);
        sandbox.assert.calledOnce(spyResponseUtilBadRequest);
        sandbox.assert.notCalled(stubTaskServiceFindOne);
        sandbox.assert.notCalled(spyResponseUtilNotFound);
        sandbox.assert.notCalled(spyResponseUtilOk);
        methods.checkNoInternalSeverError();
    });

/**
 * @param methods {Object}
 *
 * @private
 */
const shouldReturn_NotFoundStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.NOT_FOUND}`, async () => {
        // SETUP
        const sendTaskId = FAKE_TASK.id;
        const expectedResponse = {
            statusCode: HttpCodeUtil.NOT_FOUND,
            body: {}
        };
        stubTaskServiceFindOne.resolves(undefined);

        // CALL
        const response = await methods.call(sendTaskId);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        sandbox.assert.calledOnce(spyNumberUtilIsPositiveStrict);
        sandbox.assert.calledWithExactly(spyNumberUtilIsPositiveStrict, sendTaskId);
        sandbox.assert.notCalled(spyResponseUtilBadRequest);
        sandbox.assert.calledOnce(stubTaskServiceFindOne);
        sandbox.assert.calledWithExactly(stubTaskServiceFindOne, {id: sendTaskId});
        sandbox.assert.calledOnce(spyResponseUtilNotFound);
        sandbox.assert.notCalled(spyResponseUtilOk);
        methods.checkNoInternalSeverError();
    });

exports.test = test;
