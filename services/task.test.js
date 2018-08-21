const moment = require('moment')
const chai = require('chai')
const expect = chai.expect
const TaskService = require('./task')
const { dbUp, reset, dbDown } = require('../utils/db-helper')

describe('TaskService Tests', function () {
  before(dbUp)
  beforeEach(reset)

  describe('createTask', function () {
    it('should create a task and return create task correctly', async function () {
      const task = await TaskService.createTask({
        ownerId: 'owner1',
        content: 'task1',
        date: '2/8/18',
        time: '12:00'
      })
      const actualTask = await TaskService.getTaskById({ taskId: task.id })

      expect(actualTask.ownerId).to.equal('owner1')
      expect(actualTask.content).to.equal('task1')
    })

    it('should create a task with order correctly', async function () {
      const taskOne = await TaskService.createTask({
        ownerId: 'owner1',
        content: 'task1',
        date: '2/8/18',
        time: '12:00'
      })

      const taskTwo = await TaskService.createTask({
        ownerId: 'owner1',
        content: 'task2',
        date: '2/8/18',
        time: '12:00'
      })

      const taskThree = await TaskService.createTask({
        ownerId: 'owner1',
        content: 'task3',
        date: '2/8/18',
        time: '12:00'
      })

      expect(taskOne.order).to.equal(0)
      expect(taskTwo.order).to.equal(1)
      expect(taskThree.order).to.equal(2)
    })
  })

  describe('updateTask', function () {
    it('should return error when update non-existing task', async function () {
      await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      const updatedTask = await TaskService.updateTask({
        taskId: '53cb6b9b4f4ddef1ad47f943',
        content: 'newtask',
        order: 1,
        date: '8/2/18',
        time: '10:00'
      })

      expect(updatedTask.error).to.not.equal(undefined)
    })

    it('should update a task and return updated task correctly', async function () {
      const task = await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      const updatedTask = await TaskService.updateTask({
        taskId: task.id,
        content: 'newtask',
        order: 1,
        date: '8/2/18',
        time: '10:00'
      })

      expect(updatedTask.content).to.equal('newtask')
      expect(updatedTask.order).to.equal(1)
      expect(moment(updatedTask.dateTime).format('DD/MM/YY HH:mm')).to.equal('08/02/18 10:00')
    })

    it('should update only order of a task', async function () {
      const task = await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      const updatedTask = await TaskService.updateTask({
        taskId: task.id,
        order: 5
      })

      expect(updatedTask.content).to.equal('task1')
      expect(updatedTask.order).to.equal(5)
    })
  })

  describe('deleteTask', function () {
    it('should return error when delete non-existing task', async function () {
      await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      const updatedTask = await TaskService.deleteTask({
        taskId: '53cb6b9b4f4ddef1ad47f943'
      })

      expect(updatedTask.error).to.not.equal(undefined)
    })

    it('should delete a task and return deleted task correctly', async function () {
      const task = await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      const updatedTask = await TaskService.deleteTask({ taskId: task.id })

      expect(updatedTask.deleted).to.equal(true)
    })
  })

  describe('completeTask', function () {
    it('should return error when complete non-existing task', async function () {
      await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      const updatedTask = await TaskService.completeTask({
        taskId: '53cb6b9b4f4ddef1ad47f943'
      })

      expect(updatedTask.error).to.not.equal(undefined)
    })

    it('should complete a task and return completed task correctly', async function () {
      const task = await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      await TaskService.completeTask({ taskId: task.id })
      const updatedTask = await TaskService.getTaskById({ taskId: task.id })

      expect(updatedTask.completed).to.equal(true)
    })
  })

  describe('getTasks', function () {
    it('should return tasks from ownerId correctly', async function () {
      await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      await TaskService.createTask({ ownerId: 'owner1', content: 'task2' })
      await TaskService.createTask({ ownerId: 'owner1', content: 'task3' })
      await TaskService.createTask({ ownerId: 'owner2', content: 'task1' })

      const tasks = await TaskService.getTasks({ ownerId: 'owner1' })
      expect(tasks.length).to.equal(3)
    })

    it('should return only non-deleted tasks', async function () {
      await TaskService.createTask({ ownerId: 'owner1', content: 'task1' })
      await TaskService.createTask({ ownerId: 'owner1', content: 'task2' })

      const task3 = await TaskService.createTask({ ownerId: 'owner1', content: 'task3' })
      await TaskService.deleteTask({ taskId: task3.id })

      const tasks = await TaskService.getTasks({ ownerId: 'owner1' })

      expect(tasks.length).to.equal(2)
    })
  })

  after(dbDown)
})
