import { toggleStateChange, contentChange, indexChange } from "./state-handle";
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
  indexChange,
  arrayToObject,
  getTaskFromId
};
