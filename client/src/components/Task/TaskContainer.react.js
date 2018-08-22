import React, { Component } from "react";
import { SegmentGroup } from "semantic-ui-react";
import TaskList from "./TaskList.react";
import { Loading } from "../common";
import {
  getTasks,
  completeTask,
  importantTask,
  updateTask,
} from "../../services/task";
import {
  getNormalTask,
  getCompletedTask,
  getImportantTask,
  toggleStateChange,
  contentChange,
  indexChange
} from "../../utils";
import { DragDropContext } from 'react-beautiful-dnd';

export default class TaskContainer extends Component {
  state = {
    tasks: {},
    taskOrder: [],
    loading: true
  };

  async componentDidMount() {
    const tasks = await getTasks(this.props.userId);
    const taskOrder = getNormalTask(tasks).map(task => task.id)
    this.setState({ tasks, taskOrder, loading: false });
  }

  onImportantTask = taskId => {
    const tasks = toggleStateChange(this.state.tasks, taskId)("important");
    this.setState({ tasks }, async () => importantTask(taskId));
  };

  onContentSave = async (taskId, content) => {
    const tasks = contentChange(this.state.tasks, taskId)(content);
    this.setState({ tasks }, async () => await updateTask(taskId, content));
  };

  onCompleteTask = async taskId => {
    const tasks = toggleStateChange(this.state.tasks, taskId)("completed");
    this.setState({ tasks }, async () => completeTask(taskId));
  };

  onDragEnd = (param) => {
    if (!param.destination) return;
    const taskOrder = indexChange(this.state.taskOrder, param.draggableId)(param.destination.index);
    this.setState({ taskOrder });
  }

  renderImportantTasks = () => {
    const tasks = getImportantTask(this.state.tasks);
    return tasks.length > 0 ? (
      <TaskList
        listId="important-1"
        isDropDisabled
        titleColor="red"
        title={"Important"}
        tasks={tasks}
        onImportantTask={this.onImportantTask}
        onCompleteTask={this.onCompleteTask}
      />
    ) : null;
  };

  renderNormalTasks = () => {
    const tasks = getNormalTask(this.state.tasks, this.state.taskOrder);
    return tasks.length > 0 ? (
      <TaskList
        listId="normal-1"
        tasks={tasks}
        onImportantTask={this.onImportantTask}
        onCompleteTask={this.onCompleteTask}
        onContentSave={this.onContentSave}
      />
    ) : null;
  };

  renderCompletedTasks = () => {
    const tasks = getCompletedTask(this.state.tasks);
    return tasks.length > 0 ? (
      <TaskList
        listId="completed-1"
        isDropDisabled
        titleColor="teal"
        title={"Completed"}
        tasks={tasks}
        onCompleteTask={this.onCompleteTask}
      />
    ) : null;
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <SegmentGroup>
          {this.renderImportantTasks()}
          {this.renderNormalTasks()}
          {this.renderCompletedTasks()}
        </SegmentGroup>
      </DragDropContext>
    );
  }
}
