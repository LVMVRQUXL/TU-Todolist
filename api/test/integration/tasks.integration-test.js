const {describe, it, afterEach, beforeEach} = require('mocha');
const sandbox = require('sinon').createSandbox();
const request = require('supertest');
// noinspection NodeJsCodingAssistanceForCoreModules
const assert = require('assert');

const tasksRouter = require('../../src/routers/tasks.router');
const {HttpCodeUtil, ResponseUtil, StringUtil} = require('../../src/utils');
const TaskService = require('../../src/services').TaskService;

module.exports = (app) => describe('Tasks integration tests', () => {
    const baseUri = '/tasks';
    app.use(baseUri, tasksRouter);

    const fakeTask = {
        id: 1,
        content: 'test'
    };

    afterEach(() => sandbox.restore());

    describe(`POST ${baseUri}`, () => {
        let spyStringIsEmpty = undefined;
        let spyResponseBadRequest = undefined;
        let stubServiceCreate = undefined;
        let spyResponseConflict = undefined;
        let spyResponseCreated = undefined;
        let spyResponseInternalServerError = undefined;

        beforeEach(() => {
            spyStringIsEmpty = sandbox.spy(StringUtil, 'isEmpty');
            spyResponseBadRequest = sandbox.spy(ResponseUtil, 'badRequest');
            stubServiceCreate = sandbox.stub(TaskService, 'create');
            spyResponseConflict = sandbox.spy(ResponseUtil, 'conflict');
            spyResponseCreated = sandbox.spy(ResponseUtil, 'created');
            spyResponseInternalServerError = sandbox.spy(ResponseUtil, 'internalServerError');
        });

        // noinspection JSUnresolvedFunction
        const _call = async (data) => await request(app).post(baseUri).send(data);

        const _checkResponse = (response, expected) => {
            assert.strictEqual(response.statusCode, expected.statusCode);
            assert.deepStrictEqual(response.body, expected.body);
        };
        const _checkBadRequest = (dataContent, pass) => {
            sandbox.assert.calledOnce(spyStringIsEmpty);
            sandbox.assert.calledWithExactly(spyStringIsEmpty, dataContent);
            if (pass) {
                sandbox.assert.notCalled(spyResponseBadRequest);
            } else {
                sandbox.assert.calledOnce(spyResponseBadRequest);
            }
        };

        it(`should return ${HttpCodeUtil.CREATED}`, async () => {
            // SETUP
            const sendData = {content: fakeTask.content};
            const expectedResponse = {
                statusCode: HttpCodeUtil.CREATED,
                body: {
                    id: fakeTask.id,
                    content: fakeTask.content
                }
            };
            stubServiceCreate.resolves(fakeTask);

            // CALL
            const response = await _call(sendData);

            // VERIFY
            _checkResponse(response, expectedResponse);
            const passBadRequest = true;
            _checkBadRequest(sendData.content, passBadRequest);
            sandbox.assert.calledOnce(stubServiceCreate);
            sandbox.assert.calledWithExactly(stubServiceCreate, sendData);
            sandbox.assert.notCalled(spyResponseConflict);
            sandbox.assert.calledOnce(spyResponseCreated);
            sandbox.assert.notCalled(spyResponseInternalServerError);
        });

        it(`should return ${HttpCodeUtil.BAD_REQUEST}`, async () => {
            // SETUP
            const sendData = {content: undefined};
            const expectedResponse = {
                statusCode: HttpCodeUtil.BAD_REQUEST,
                body: {}
            };

            // CALL
            const response = await _call(sendData);

            // VERIFY
            _checkResponse(response, expectedResponse);
            const passBadRequest = false;
            _checkBadRequest(sendData.content, passBadRequest);
            sandbox.assert.notCalled(stubServiceCreate);
            sandbox.assert.notCalled(spyResponseConflict);
            sandbox.assert.notCalled(spyResponseCreated);
            sandbox.assert.notCalled(spyResponseInternalServerError);
        });

        it(`should return ${HttpCodeUtil.CONFLICT}`, async () => {
            // SETUP
            const sendData = {content: fakeTask.content};
            const expectedResponse = {
                statusCode: HttpCodeUtil.CONFLICT,
                body: {}
            };
            stubServiceCreate.resolves(undefined);

            // CALL
            const response = await _call(sendData);

            // VERIFY
            _checkResponse(response, expectedResponse);
            const passBadRequest = true;
            _checkBadRequest(sendData.content, passBadRequest);
            sandbox.assert.calledOnce(stubServiceCreate);
            sandbox.assert.calledWithExactly(stubServiceCreate, sendData);
            sandbox.assert.calledOnce(spyResponseConflict);
            sandbox.assert.notCalled(spyResponseCreated);
            sandbox.assert.notCalled(spyResponseInternalServerError);
        });
    });
});
