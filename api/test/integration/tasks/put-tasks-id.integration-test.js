const {describe, it, beforeEach} = require('mocha');
const request = require('supertest');

const {HttpCodeUtil, NumberUtil, ResponseUtil, StringUtil} = require('../../../src/utils');
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
let spyStringUtilIsEmpty = undefined;

let stubTaskServiceFindOne = undefined;
let stubTaskServiceUpdate = undefined;

/**
 * @param app {*}
 * @param currentSandbox {*}
 * @param methods {Object}
 */
const test = (app, currentSandbox, methods) => void describe(`PUT ${URI_MODEL}`, () => {
    sandbox = currentSandbox;

    beforeEach(() => {
        spyNumberUtilIsPositiveStrict = sandbox.spy(NumberUtil, 'isPositiveStrict');
        spyResponseUtilBadRequest = sandbox.spy(ResponseUtil, 'badRequest');
        spyResponseUtilNotFound = sandbox.spy(ResponseUtil, 'notFound');
        spyResponseUtilOk = sandbox.spy(ResponseUtil, 'ok');
        spyStringUtilIsEmpty = sandbox.spy(StringUtil, 'isEmpty');

        stubTaskServiceFindOne = sandbox.stub(TaskService, 'findOne');
        stubTaskServiceUpdate = sandbox.stub(TaskService, 'update');
    });

    // noinspection JSUnresolvedFunction
    /**
     * @param taskId {number}
     * @param sendData {Object}
     *
     * @return {Promise<*>}
     */
    const call = async (taskId, sendData) => await request(app)
        .put(`${BASE_URI}/${taskId.toString()}`)
        .send(sendData);

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
    void it(`should return ${HttpCodeUtil.OK}`, async () => {
        // SETUP
        const sendTaskId = FAKE_TASK.id;
        const sendData = {content: FAKE_TASK.content};
        const expectedResponse = {
            statusCode: HttpCodeUtil.OK,
            body: {}
        };
        stubTaskServiceFindOne.resolves(FAKE_TASK);
        stubTaskServiceUpdate.resolves(undefined);

        // CALL
        const response = await methods.call(sendTaskId, sendData);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        spiesCalledOnce_([
            spyNumberUtilIsPositiveStrict,
            spyStringUtilIsEmpty,
            stubTaskServiceFindOne,
            stubTaskServiceUpdate,
            spyResponseUtilOk
        ]);
        spiesNotCalled_([spyResponseUtilBadRequest, spyResponseUtilNotFound]);
        assert_().calledWithExactly(spyNumberUtilIsPositiveStrict, sendTaskId);
        assert_().calledWithExactly(spyStringUtilIsEmpty, sendData.content);
        const where = {id: sendTaskId};
        assert_().calledWithExactly(stubTaskServiceFindOne, where);
        const values = {
            id: sendTaskId,
            content: sendData.content
        };
        assert_().calledWithExactly(stubTaskServiceUpdate, values, where);
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
        const sendTaskId = FAKE_TASK.id;
        const sendData = {content: ''};
        const expectedResponse = {
            statusCode: HttpCodeUtil.BAD_REQUEST,
            body: {}
        };

        // CALL
        const response = await methods.call(sendTaskId, sendData);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        spiesCalledOnce_([spyNumberUtilIsPositiveStrict, spyStringUtilIsEmpty, spyResponseUtilBadRequest]);
        spiesNotCalled_([
            stubTaskServiceFindOne,
            spyResponseUtilNotFound,
            stubTaskServiceUpdate,
            spyResponseUtilOk
        ]);
        assert_().calledWithExactly(spyNumberUtilIsPositiveStrict, sendTaskId);
        assert_().calledWithExactly(spyStringUtilIsEmpty, sendData.content);
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
        const sendData = {content: FAKE_TASK.content};
        const expectedResponse = {
            statusCode: HttpCodeUtil.NOT_FOUND,
            body: {}
        };
        stubTaskServiceFindOne.resolves(undefined);

        // CALL
        const response = await methods.call(sendTaskId, sendData);

        // VERIFY
        methods.checkResponse(response, expectedResponse);
        spiesCalledOnce_([
            spyNumberUtilIsPositiveStrict,
            spyStringUtilIsEmpty,
            stubTaskServiceFindOne,
            spyResponseUtilNotFound
        ]);
        spiesNotCalled_([spyResponseUtilBadRequest, stubTaskServiceUpdate, spyResponseUtilOk]);
        assert_().calledWithExactly(spyNumberUtilIsPositiveStrict, sendTaskId);
        assert_().calledWithExactly(spyStringUtilIsEmpty, sendData.content);
        const where = {id: sendTaskId};
        assert_().calledWithExactly(stubTaskServiceFindOne, where);
        methods.checkNoInternalSeverError();
    });

/**
 * @return {*}
 *
 * @private
 */
const assert_ = () => sandbox.assert;

/**
 * @param spies {*[]}
 *
 * @private
 */
const spiesCalledOnce_ = (spies) => void spies.forEach(spy => void spyCalledOnce_(spy));

/**
 * @param spies {*[]}
 *
 * @private
 */
const spiesNotCalled_ = (spies) => void spies.forEach(spy => void spyNotCalled_(spy));

/**
 * @param spy {*}
 *
 * @private
 */
const spyCalledOnce_ = (spy) => void assert_().calledOnce(spy);

/**
 * @param spy {*}
 *
 * @private
 */
const spyNotCalled_ = (spy) => void assert_().notCalled(spy);

exports.test = test;
