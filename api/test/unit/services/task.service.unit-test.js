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
            },
            findAll: () => {
            },
            findOne: () => {
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

    const _assert_calledOnceWithExactly = (spy, args) => {
        sandbox.assert.calledOnce(spy);
        if (!args) {
            sandbox.assert.calledWithExactly(spy);
        } else {
            sandbox.assert.calledWithExactly(spy, args);
        }
    };

    afterEach(() => sandbox.restore());

    describe('#create', () => {
        let stubCreate = undefined;
        let spyMapToDTO = undefined;

        beforeEach(() => {
            stubCreate = sandbox.stub(MockedModels.Task, 'create');
            spyMapToDTO = sandbox.spy(TaskService, 'mapToDTO');
        });

        // noinspection JSUnresolvedFunction
        const _call = async (values) => await TaskService.create(values);

        it('should return the created task', async () => {
            // SETUP
            const values = {content: fakeTask.content};
            const expectedTaskDTO = {
                id: fakeTask.id,
                content: fakeTask.content
            };
            stubCreate.resolves(fakeTask);

            // CALL
            const taskDTO = await _call(values);

            // VERIFY
            assert.notStrictEqual(taskDTO, undefined);
            assert.strictEqual(taskDTO.id, expectedTaskDTO.id);
            assert.strictEqual(taskDTO.content, expectedTaskDTO.content);
            _assert_calledOnceWithExactly(stubCreate, values);
            _assert_calledOnceWithExactly(spyMapToDTO, fakeTask);
        });

        it('should return undefined if a conflict has occurred', async () => {
            // SETUP
            const values = {content: fakeTask.content};
            const expectedTaskDTO = undefined;
            stubCreate.resolves(undefined);

            // CALL
            const taskDTO = await _call(values);

            // VERIFY
            assert.strictEqual(taskDTO, expectedTaskDTO);
            _assert_calledOnceWithExactly(stubCreate, values);
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
            _assert_calledOnceWithExactly(stubDestroy, {where: where});
        });
    });

    describe('#findAll', () => {
        // noinspection JSUnresolvedFunction
        const _call = async () => await TaskService.findAll();

        it('should return a singleton list of tasks', async () => {
            // SETUP
            const expectedTaskDTO = {
                id: fakeTask.id,
                content: fakeTask.content
            };
            const stubFindAll = sandbox.stub(MockedModels.Task, 'findAll');
            const spyMapToDTO = sandbox.spy(TaskService, 'mapToDTO');
            stubFindAll.resolves([fakeTask]);

            // CALL
            const taskDTOs = await _call();

            // VERIFY
            assert.notStrictEqual(taskDTOs, undefined);
            assert.strictEqual(taskDTOs.length, 1);
            const taskDTO = taskDTOs[0];
            assert.strictEqual(taskDTO.id, expectedTaskDTO.id);
            assert.strictEqual(taskDTO.content, expectedTaskDTO.content);
            _assert_calledOnceWithExactly(stubFindAll);
            _assert_calledOnceWithExactly(spyMapToDTO, fakeTask);
        });

        it('should return an empty list of tasks', async () => {
            // SETUP
            const stubFindAll = sandbox.stub(MockedModels.Task, 'findAll');
            const spyMapToDTO = sandbox.spy(TaskService, 'mapToDTO');
            stubFindAll.resolves([]);

            // CALL
            const taskDTOs = await _call();

            // VERIFY
            assert.notStrictEqual(taskDTOs, undefined);
            assert.strictEqual(taskDTOs.length, 0);
            _assert_calledOnceWithExactly(stubFindAll);
            sandbox.assert.notCalled(spyMapToDTO);
        });
    });

    describe('#findOne', () => {
        let stubFindOne = undefined;
        let spyMapToDTO = undefined;

        beforeEach(() => {
            stubFindOne = sandbox.stub(MockedModels.Task, 'findOne');
            spyMapToDTO = sandbox.spy(TaskService, 'mapToDTO');
        });

        const where = {id: fakeTask.id};
        // noinspection JSUnresolvedFunction
        const _call = async (where) => await TaskService.findOne(where);

        it('should return one task with valid where clause', async () => {
            // SETUP
            const expectedTask = {
                id: fakeTask.id,
                content: fakeTask.content
            };
            stubFindOne.resolves(fakeTask);

            // CALL
            const task = await _call(where);

            // VERIFY
            assert.notStrictEqual(task, undefined);
            assert.strictEqual(task.id, expectedTask.id);
            assert.strictEqual(task.content, expectedTask.content);
            _assert_calledOnceWithExactly(stubFindOne, {where: where});
            _assert_calledOnceWithExactly(spyMapToDTO, fakeTask);
        });

        it('should return undefined with invalid where clause', async () => {
            // SETUP
            const expectedTask = undefined;
            stubFindOne.resolves(undefined);

            // CALL
            const task = await _call(where);

            // VERIFY
            assert.strictEqual(task, expectedTask);
            _assert_calledOnceWithExactly(stubFindOne, {where: where});
            sandbox.assert.notCalled(spyMapToDTO);
        });
    });

    describe('#mapToDTO', () => {
        it('should return a task DTO with given values', () => {
            // SETUP
            const expectedTaskDTO = {
                id: fakeTask.id,
                content: fakeTask.content
            };

            // CALL
            // noinspection JSUnresolvedFunction
            const taskDTO = TaskService.mapToDTO(fakeTask);

            // VERIFY
            assert.notStrictEqual(taskDTO, undefined);
            assert.strictEqual(taskDTO.id, expectedTaskDTO.id);
            assert.strictEqual(taskDTO.content, expectedTaskDTO.content);
        });
    });
});
