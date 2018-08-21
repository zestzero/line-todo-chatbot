import React, { Component } from "react";
import { SegmentGroup } from "semantic-ui-react";
import Task from "./Task.react";
import { Loading } from "./common";
import { getTasks } from "../services/task";
import {
  getNormalTask,
  getCompletedTask,
  getImportantTask
} from "../utils/task-filter";

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
    console.log(`mark as important ${taskId}`);
  };

  onContentChange = (e, taskId) => {
    console.log(`change to ${e.target.value} for ${taskId}`);
  };

  onCompleteTask = taskId => {
    console.log(`completeTask ${taskId}`);
  };

  onDeleteTask = taskId => {
    console.log(`deleteTask ${taskId}`);
  };

  renderImportantTasks = () => (
    <SegmentGroup>
      {getImportantTask(this.state.tasks).map(task => (
        <Task
          key={task.id}
          {...task}
          onCompleteTask={this.onCompleteTask}
          onImportantTask={this.onImportantTask}
          onContentChange={this.onContentChange}
          onDeleteTask={this.onDeleteTask}
        />
      ))}
    </SegmentGroup>
  );

  renderNormalTasks = () => (
    <SegmentGroup>
      {getNormalTask(this.state.tasks).map(task => (
        <Task
          key={task.id}
          {...task}
          onCompleteTask={this.onCompleteTask}
          onImportantTask={this.onImportantTask}
          onContentChange={this.onContentChange}
          onDeleteTask={this.onDeleteTask}
        />
      ))}
    </SegmentGroup>
  );

  renderCompletedTasks = () => (
    <SegmentGroup>
      {getCompletedTask(this.state.tasks).map(task => (
        <Task
          key={task.id}
          {...task}
          onCompleteTask={this.onCompleteTask}
          onImportantTask={this.onImportantTask}
          onContentChange={this.onContentChange}
          onDeleteTask={this.onDeleteTask}
          completed={task.completed}
        />
      ))}
    </SegmentGroup>
  );

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <SegmentGroup>
        <SegmentGroup>{this.renderImportantTasks()}</SegmentGroup>
        <SegmentGroup>{this.renderNormalTasks()}</SegmentGroup>
        <SegmentGroup>{this.renderCompletedTasks()}</SegmentGroup>
      </SegmentGroup>
    );
  }
}
