const _ = require('lodash')
const TaskDB = require('../db/task')
const { ERROR_MSG } = require('../utils/constants')
const { getCompactTask } = require('../utils/task')
const { getFormatDateTime } = require('../utils/date')

async function validateTask (taskId, callback) {
  try {
    const existTask = await TaskDB.findTaskById({ taskId })
    if (_.isEmpty(existTask)) return { error: ERROR_MSG.TASK.NOT_FOUND }
  } catch (err) {
    return { error: err.message }
  }

  return { result: await callback }
}

exports.createTask = async ({ ownerId, content, dateTime }) => {
  const task = await TaskDB.createTask({ ownerId, content, dateTime })
  return getCompactTask(task)
}

exports.getTasks = async ({ ownerId }) => {
  const tasks = await TaskDB.findTasksByOwnerId({ ownerId })
  return _.map(tasks, getCompactTask)
}

exports.getTaskById = async ({ taskId }) => {
  const task = await TaskDB.findTaskById({ taskId })
  return getCompactTask(task)
}

exports.updateTask = async ({ taskId, content, order, date, time }) => {
  const dateTime = getFormatDateTime(date, time)
  const { result, error } = await validateTask(
    taskId, TaskDB.updateTask({ taskId }, { content, order, date_time: dateTime })
  )
  if (error) return { error }
  return getCompactTask(result)
}

exports.deleteTask = async ({ taskId }) => {
  const { result, error } = await validateTask(taskId, TaskDB.deleteTask({ taskId }))
  if (error) return { error }
  return getCompactTask(result)
}

exports.completeTask = async ({ taskId }) => {
  const { result, error } = await validateTask(taskId, TaskDB.completeTask({ taskId }))
  if (error) return { error }
  return getCompactTask(result)
}
