import React, { Component } from "react";
import { SegmentGroup } from "semantic-ui-react";
import TaskList from "./TaskList.react";
import { Loading } from "../common";
import { getTasks, completeTask, importantTask } from "../../services/task";
import {
  getNormalTask,
  getCompletedTask,
  getImportantTask
} from "../../utils/task-filter";
import { toggleStateChange } from "../../utils/utils";

export default class TaskContainer extends Component {
  state = {
    tasks: [],
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

  onContentChange = (e, taskId) => {
    console.log(`change to ${e.target.value} for ${taskId}`);
  };

  onCompleteTask = async taskId => {
    const tasks = toggleStateChange(this.state.tasks, taskId)("completed");
    this.setState({ tasks }, async () => completeTask(taskId));
  };

  renderImportantTasks = () => {
    const tasks = getImportantTask(this.state.tasks);
    return tasks.length > 0 ? (
      <TaskList
        titleColor='red'
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
        tasks={tasks}
        onImportantTask={this.onImportantTask}
        onCompleteTask={this.onCompleteTask}
      />
    ) : null;
  };

  renderCompletedTasks = () => {
    const tasks = getCompletedTask(this.state.tasks);
    return tasks.length > 0 ? (
      <TaskList
        titleColor='teal'
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
      <SegmentGroup>
        {this.renderImportantTasks()}
        {this.renderNormalTasks()}
        {this.renderCompletedTasks()}
      </SegmentGroup>
    );
  }
}
