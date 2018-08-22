import {
  getNormalTask,
  getCompletedTask,
  getImportantTask
} from "./task-filter";

const MOCK_TASKS = [
  { id: 1, content: 'normal', completed: false, important: false },
  { id: 2, content: 'completed', completed: true, important: false },
  { id: 3, content: 'important', completed: false, important: true },
  { id: 4, content: 'both', completed: true, important: true },
]

describe("task-filter", () => {
  describe("getNormalTask", () => {
    it("should return only normal task", () => {
      const tasks = getNormalTask(MOCK_TASKS);

      expect(tasks.length).toEqual(1)
    })
  });

  describe("getCompletedTask", () => {
    it("should return only completed task", () => {
      const tasks = getCompletedTask(MOCK_TASKS);

      expect(tasks.length).toEqual(2)
    })
  });

  describe("getImportantTask", () => {
    it("should return only important task", () => {
      const tasks = getImportantTask(MOCK_TASKS);

      expect(tasks.length).toEqual(2)
    })
  });
});
