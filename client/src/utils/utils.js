import _ from "lodash";

export const toggleStateChange = (tasks, taskId) => property => {
  return _.map(
    tasks,
    task => {
      return task.id === taskId
        ? _.assign({}, task, { [property]: !_.get(task, property) })
        : task
    }
  );
};
