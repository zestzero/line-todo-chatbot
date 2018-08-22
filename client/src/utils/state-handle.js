import _ from "lodash";

export const toggleStateChange = (tasks, taskId) => property => {
  return _.map(tasks, task => {
    return task.id === taskId
      ? _.assign({}, task, { [property]: !_.get(task, property) })
      : task;
  });
};

export const contentChange = (tasks, taskId) => content => {
  return _.map(tasks, task => {
    return task.id === taskId ? _.assign({}, task, { content }) : task;
  });
};

export const indexChange = (taskOrder, selectedTaskId) => index => {
  const taskOrderExcludeTaskId = _.pull(taskOrder, selectedTaskId);
  return taskOrderExcludeTaskId.slice(0, index).concat(selectedTaskId).concat(taskOrderExcludeTaskId.slice(index, taskOrderExcludeTaskId.length))
};