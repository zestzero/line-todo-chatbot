const express = require('express')
const router = express.Router()
const TaskService = require('../services/task')
const bodyParser = require('body-parser')
const { apiErrorHandler } = require('../utils/error')
const jsonParser = bodyParser.json()

router.post('/task.get', jsonParser, apiErrorHandler, async (req, res) => {
  const task = await TaskService.getTasks({ ownerId: req.body.ownerId })
  return res.json(task)
})

router.post('/task.create', jsonParser, apiErrorHandler, async (req, res) => {
  const task = await TaskService.createTask({
    ownerId: req.body.ownerId,
    content: req.body.content
  })
  return res.json(task)
})

router.post('/task.update', jsonParser, apiErrorHandler, async (req, res) => {
  const task = await TaskService.updateTask({
    taskId: req.body.taskId,
    content: req.body.content,
    order: req.body.order
  })
  return res.json(task)
})

router.post('/task.delete', jsonParser, apiErrorHandler, async (req, res) => {
  const task = await TaskService.deleteTask({ taskId: req.body.taskId })
  return res.json(task)
})

router.post('/task.complete', jsonParser, apiErrorHandler, async (req, res) => {
  const task = await TaskService.completeTask({ taskId: req.body.taskId })
  return res.json(task)
})

module.exports = router
