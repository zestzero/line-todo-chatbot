const express = require('express')
const router = express.Router()
const Joi = require('joi')
const TaskService = require('../services/task')
const { apiErrorHandler } = require('../middlewares')

const middlewares = [ apiErrorHandler ]

router.post('/task.get-tasks', middlewares, async (req, res) => {
  const schema = Joi.object().keys({
    owner_id: Joi.string().alphanum().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.status(400).json(error.details)

  const task = await TaskService.getTasks({ ownerId: req.body.owner_id })
  return res.json(task)
})

router.post('/task.create', middlewares, async (req, res) => {
  const schema = Joi.object().keys({
    owner_id: Joi.string().alphanum().required(),
    content: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.status(400).json(error.details)

  const task = await TaskService.createTask({
    ownerId: req.body.owner_id,
    ...req.body
  })
  return res.json(task)
})

router.post('/task.update', middlewares, async (req, res) => {
  const schema = Joi.object().keys({
    task_id: Joi.string().alphanum().required(),
    content: Joi.string(),
    order: Joi.string(),
    date: Joi.string(),
    time: Joi.string()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.status(400).json(error.details)

  const task = await TaskService.updateTask({
    taskId: req.body.task_id,
    ...req.body
  })
  return res.json(task)
})

router.post('/task.delete', middlewares, async (req, res) => {
  const schema = Joi.object().keys({
    task_id: Joi.string().alphanum().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.status(400).json(error.details)

  const task = await TaskService.deleteTask({ taskId: req.body.task_id })
  return res.json(task)
})

router.post('/task.complete', middlewares, async (req, res) => {
  const schema = Joi.object().keys({
    task_id: Joi.string().alphanum().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.status(400).json(error.details)

  const task = await TaskService.completeTask({ taskId: req.body.task_id })
  return res.json(task)
})

router.post('/task.important', middlewares, async (req, res) => {
  const schema = Joi.object().keys({
    task_id: Joi.string().alphanum().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.status(400).json(error.details)

  const task = await TaskService.importantTask({ taskId: req.body.task_id })
  return res.json(task)
})

module.exports = router
