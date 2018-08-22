import { toggleStateChange, contentChange, orderChange } from "./state-handle";
import {
  getNormalTask,
  getCompletedTask,
  getImportantTask
} from "./task-filter";
import { arrayToObject, getTaskFromId } from "./utils";

export {
  getNormalTask,
  getCompletedTask,
  getImportantTask,
  toggleStateChange,
  contentChange,
  orderChange,
  arrayToObject,
  getTaskFromId
};
