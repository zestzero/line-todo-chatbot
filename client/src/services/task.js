import axios from 'axios';

const getTasks = async (ownerId) => {
  const promise = await axios.post('/api/task.get-tasks', { owner_id: ownerId })
  return promise.data
}

const completeTask = async (taskId) => {
  return axios.post('/api/task.complete', { task_id: taskId })
}

const importantTask = async (taskId) => {
  return axios.post('/api/task.important', { task_id: taskId })
}

export { getTasks, completeTask, importantTask }