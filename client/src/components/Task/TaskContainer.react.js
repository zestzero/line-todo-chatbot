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
  orderChange
} from "../../utils";
import { DragDropContext } from 'react-beautiful-dnd';

export default class TaskContainer extends Component {
  state = {
    tasks: {},
    loading: true
  };

  async componentDidMount() {
    const tasks = await getTasks(this.props.userId);
    this.setState({ tasks, loading: false });
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
    console.log(param);
    if (!param.destination) return;
    const orderOffset = param.destination.index - param.source.index;
    const tasks = orderChange(this.state.tasks, param.draggableId)(orderOffset);
    this.setState({ tasks }); //, async () => updateTask(param.draggableId, { order: }))
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
    const tasks = getNormalTask(this.state.tasks);
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
