const {describe, it, beforeEach} = require('mocha');
const request = require('supertest');

const {HttpCodeUtil, ResponseUtil, StringUtil} = require('../../../src/utils');
const TaskService = require('../../../src/services').TaskService;

const BASE_URI = '/tasks';
const FAKE_TASK = {
    id: 1,
    content: 'test'
};
let sandbox = undefined;

let spyResponseUtilBadRequest = undefined;
let spyResponseUtilConflict = undefined;
let spyResponseUtilCreated = undefined;
let spyStringUtilIsEmpty = undefined;

let stubTaskServiceCreate = undefined;

/**
 * @param app {*}
 * @param currentSandbox {*}
 * @param methods {Object}
 */
const test = (app, currentSandbox, methods) => void describe(`POST ${BASE_URI}`, () => {
    sandbox = currentSandbox;

    beforeEach(() => {
        spyResponseUtilBadRequest = sandbox.spy(ResponseUtil, 'badRequest');
        spyResponseUtilConflict = sandbox.spy(ResponseUtil, 'conflict');
        spyResponseUtilCreated = sandbox.spy(ResponseUtil, 'created');
        spyStringUtilIsEmpty = sandbox.spy(StringUtil, 'isEmpty');

        stubTaskServiceCreate = sandbox.stub(TaskService, 'create');
    });

    // noinspection JSUnresolvedFunction
    /**
     * @param data {Object}
     *
     * @return {Promise<Object>}
     *
     * @private
     */
    const call = async (data) => await request(app).post(BASE_URI).send(data);

    /**
     * @param dataContent {string}
     * @param pass {boolean}
     *
     * @private
     */
    const checkBadRequest = (dataContent, pass) => {
        currentSandbox.assert.calledOnce(spyStringUtilIsEmpty);
        currentSandbox.assert.calledWithExactly(spyStringUtilIsEmpty, dataContent);
        if (pass) {
            currentSandbox.assert.notCalled(spyResponseUtilBadRequest);
        } else {
            currentSandbox.assert.calledOnce(spyResponseUtilBadRequest);
        }
    };

    const USEFUL_METHODS = Object.assign({call, checkBadRequest}, methods);

    shouldReturn_CreatedStatusCode_(USEFUL_METHODS);
    shouldReturn_BadRequestStatusCode_(USEFUL_METHODS);
    shouldReturn_ConflictStatusCode_(USEFUL_METHODS);
});

/**
 * @param methods {Object}
 *
 * @private
 */
const shouldReturn_CreatedStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.CREATED} and created task`, async () => {
        // SETUP
        const sendData = {content: FAKE_TASK.content};
        const expectedResponse = {
            statusCode: HttpCodeUtil.CREATED,
            body: {
                id: FAKE_TASK.id,
                content: FAKE_TASK.content
            }
        };
        stubTaskServiceCreate.resolves(FAKE_TASK);

        // CALL
        const response = await methods.call(sendData);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        const passBadRequest = true;
        methods.checkBadRequest(sendData.content, passBadRequest);
        sandbox.assert.calledOnce(stubTaskServiceCreate);
        sandbox.assert.calledWithExactly(stubTaskServiceCreate, sendData);
        sandbox.assert.notCalled(spyResponseUtilConflict);
        sandbox.assert.calledOnce(spyResponseUtilCreated);
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
        const sendData = {content: undefined};
        const expectedResponse = {
            statusCode: HttpCodeUtil.BAD_REQUEST,
            body: {}
        };

        // CALL
        const response = await methods.call(sendData);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        const passBadRequest = false;
        methods.checkBadRequest(sendData.content, passBadRequest);
        sandbox.assert.notCalled(stubTaskServiceCreate);
        sandbox.assert.notCalled(spyResponseUtilConflict);
        sandbox.assert.notCalled(spyResponseUtilCreated);
        methods.checkNoInternalSeverError();
    });

/**
 * @param methods {Object}
 *
 * @private
 */
const shouldReturn_ConflictStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.CONFLICT}`, async () => {
        // SETUP
        const sendData = {content: FAKE_TASK.content};
        const expectedResponse = {
            statusCode: HttpCodeUtil.CONFLICT,
            body: {}
        };
        stubTaskServiceCreate.resolves(undefined);

        // CALL
        const response = await methods.call(sendData);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        const passBadRequest = true;
        methods.checkBadRequest(sendData.content, passBadRequest);
        sandbox.assert.calledOnce(stubTaskServiceCreate);
        sandbox.assert.calledWithExactly(stubTaskServiceCreate, sendData);
        sandbox.assert.calledOnce(spyResponseUtilConflict);
        sandbox.assert.notCalled(spyResponseUtilCreated);
        methods.checkNoInternalSeverError();
    });

exports.test = test;
