const {describe, it, beforeEach, afterEach} = require('mocha');
// noinspection NodeJsCodingAssistanceForCoreModules
const assert = require('assert');
const sandbox = require('sinon').createSandbox();
const proxyquire = require('proxyquire');

module.exports = () => describe('TaskService', () => {
    const MockedModels = {
        Task: {
            create: () => {
            },
            destroy: () => {
            }
        }
    };
    const TaskService = proxyquire('../../../src/services/task.service', {
        '../models': MockedModels
    });

    const fakeTask = {
        id: 1,
        content: 'test'
    };

    afterEach(() => sandbox.restore());

    describe('#create', () => {
        let stubCreate = undefined;
        let spyMapToDTO = undefined;

        beforeEach(() => {
            stubCreate = sandbox.stub(MockedModels.Task, 'create');
            spyMapToDTO = sandbox.spy(TaskService, 'mapToDTO');
        });

        it('should return the created task', async () => {
            // SETUP
            const values = {content: fakeTask.content};
            const expectedTaskDTO = {
                id: fakeTask.id,
                content: fakeTask.content
            };
            stubCreate.resolves(fakeTask);

            // CALL
            // noinspection JSUnresolvedFunction
            const taskDTO = await TaskService.create(values);

            // VERIFY
            assert.notStrictEqual(taskDTO, undefined);
            assert.strictEqual(taskDTO.id, expectedTaskDTO.id);
            assert.strictEqual(taskDTO.content, expectedTaskDTO.content);
            sandbox.assert.calledOnce(stubCreate);
            sandbox.assert.calledWithExactly(stubCreate, values);
            sandbox.assert.calledOnce(spyMapToDTO);
            sandbox.assert.calledWithExactly(spyMapToDTO, fakeTask);
        });

        it('should return undefined if a conflict has occurred', async () => {
            // SETUP
            const values = {content: fakeTask.content};
            const expectedTaskDTO = undefined;
            stubCreate.resolves(undefined);

            // CALL
            // noinspection JSUnresolvedFunction
            const taskDTO = await TaskService.create(values);

            // VERIFY
            assert.strictEqual(taskDTO, expectedTaskDTO);
            sandbox.assert.calledOnce(stubCreate);
            sandbox.assert.calledWithExactly(stubCreate, values);
            sandbox.assert.notCalled(spyMapToDTO);
        });
    });

    describe('#destroy', () => {
        it('should return nothing', async () => {
            // SETUP
            const where = {id: fakeTask.id};
            const expectedResult = undefined;
            const stubDestroy = sandbox.stub(MockedModels.Task, 'destroy');
            stubDestroy.resolves();

            // CALL
            // noinspection JSUnresolvedFunction
            const result = await TaskService.destroy(where);

            // VERIFY
            assert.strictEqual(result, expectedResult);
            sandbox.assert.calledOnce(stubDestroy);
            sandbox.assert.calledWithExactly(stubDestroy, {where: where});
        });
    });
});
