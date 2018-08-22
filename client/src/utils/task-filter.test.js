import moment from "moment";
import {
  getNormalTask,
  getCompletedTask,
  getImportantTask
} from "./task-filter";

const MOCK_TASKS = [
  { id: 1, content: "normal", completed: false, important: false },
  { id: 2, content: "completed", completed: true, important: false },
  { id: 3, content: "important", completed: false, important: true },
  { id: 4, content: "both", completed: true, important: true }
];

describe("task-filter", () => {
  describe("getNormalTask", () => {
    it("should return only normal task", () => {
      const tasks = getNormalTask(MOCK_TASKS);

      expect(tasks.length).toEqual(1);
    });

    it("should sort normal task correctly", () => {
      const MOCK_TASKS = [
        {
          id: 1,
          content: "normal0",
          completed: false,
          important: false,
          dateTime: moment("2018-06-20 13:00")
        },
        {
          id: 2,
          content: "normal1",
          completed: false,
          important: false,
          dateTime: moment("2018-06-05 13:00")
        },
        {
          id: 3,
          content: "normal2",
          completed: false,
          important: false,
          dateTime: moment("2018-06-01 14:00")
        },
        {
          id: 4,
          content: "normal3",
          completed: false,
          important: false,
          dateTime: moment("2018-06-01 05:00")
        }
      ];
      const tasks = getNormalTask(MOCK_TASKS);

      expect(tasks.length).toEqual(4);
      expect(tasks.map(task => task.id)).toEqual([ 4, 3, 2, 1])
    });
  });

  describe("getCompletedTask", () => {
    it("should return only completed task", () => {
      const tasks = getCompletedTask(MOCK_TASKS);

      expect(tasks.length).toEqual(2);
    });
  });

  describe("getImportantTask", () => {
    it("should return only important task", () => {
      const tasks = getImportantTask(MOCK_TASKS);

      expect(tasks.length).toEqual(2);
    });
  });
});
