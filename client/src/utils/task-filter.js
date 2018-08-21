export const getNormalTask = (tasks) => {
  return tasks.map(task => !task.important && !task.completed)
}

export const getCompletedTask = (tasks) => {
  return tasks
}

export const getImportantTask = (tasks) => {
  return tasks
}