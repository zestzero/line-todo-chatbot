import _ from "lodash";

export const getNormalTask = (tasks, taskOrder = []) => {
  const normalTasks = _.filter(
    tasks,
    task => !task.important && !task.completed
  );
  if (taskOrder.length > 0) {
    return _.map(taskOrder, taskId => _.find(tasks, ["id", taskId]));
  }
  return _.orderBy(normalTasks, "dateTime", "asc");
};

export const getCompletedTask = tasks => {
  return _.filter(tasks, task => task.completed);
};

export const getImportantTask = tasks => {
  return _.filter(tasks, task => task.important);
};
