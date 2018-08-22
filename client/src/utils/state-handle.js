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

export const orderChange = (tasks, taskId) => orderOffset => {
  return _.map(tasks, task => {
    return task.id === taskId ? _.assign({}, task, { order: task.order + orderOffset }) : task;
  });
};