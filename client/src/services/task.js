import axios from 'axios';

const getTasks = async (ownerId) => {
  const promise = await axios.post('/api/task.get-tasks', { owner_id: ownerId })
  return promise.data
}

export { getTasks }