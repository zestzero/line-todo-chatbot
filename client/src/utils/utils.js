import _ from "lodash";

export const arrayToObject = array =>
  _.reduce(
    array,
    (obj, item) => {
      obj[item.id] = item;
      return obj;
    },
    {}
  );

export const getTaskFromId = (tasks, taskId) => _.find(tasks, ['id', taskId]);
