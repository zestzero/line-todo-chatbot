import {
  toggleStateChange,
  contentChange
} from "./state-handle";

const MOCK_TASKS = [
  { id: 1, content: 'normal', completed: false, important: false },
  { id: 2, content: 'completed', completed: true, important: false },
  { id: 3, content: 'important', completed: false, important: true },
  { id: 4, content: 'both', completed: true, important: true },
]

describe("state-handle", () => {
  describe("toggleStateChange", () => {
    it("should return tasks with completed flag updated", () => {
      const tasks = toggleStateChange(MOCK_TASKS, 1)('completed');

      expect(MOCK_TASKS[0].completed).toEqual(false);
      expect(tasks[0].completed).toEqual(true);
    })

    it("should return tasks with important flag updated", () => {
      const tasks = toggleStateChange(MOCK_TASKS, 1)('important');

      expect(MOCK_TASKS[0].important).toEqual(false);
      expect(tasks[0].important).toEqual(true);
    })
  });

  describe("contentChange", () => {
    it("should return tasks with updated content", () => {
      const tasks = contentChange(MOCK_TASKS, 1)('special');

      expect(MOCK_TASKS[0].content).toEqual('normal');
      expect(tasks[0].content).toEqual('special')
    })
  });
});
