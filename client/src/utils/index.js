import { toggleStateChange, contentChange } from "./state-handle";
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
  arrayToObject,
  getTaskFromId
};
