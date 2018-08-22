import _ from 'lodash';

export const getNormalTask = (tasks) => {
  return _.filter(tasks, task => !task.important && !task.completed)
}

export const getCompletedTask = (tasks) => {
  return  _.filter(tasks, task => task.completed)
}

export const getImportantTask = (tasks) => {
  return  _.filter(tasks, task => task.important)
}