import _ from "lodash";

export const getNormalTask = tasks => {
  return _.orderBy(
    _.filter(tasks, task => !task.important && !task.completed),
    "order",
    "asc"
  );
};

export const getCompletedTask = tasks => {
  return _.filter(tasks, task => task.completed);
};

export const getImportantTask = tasks => {
  return _.filter(tasks, task => task.important);
};
