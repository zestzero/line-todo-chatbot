import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000'
const getTasks = async (ownerId) => {
  const tasks = await axios.post(BACKEND_URL + '/api/task.get', { ownerId })
  console.log(tasks)
  return tasks
}

export { getTasks }