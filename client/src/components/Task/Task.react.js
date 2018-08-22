import moment from "moment";
import React, { Component } from "react";
import { Segment, Icon } from "semantic-ui-react";
import "./Task.css";

export default class Task extends Component {
  state = { editMode: false, content: this.props.content || "" };

  onEditModeToggle = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  onContentChange = e => {
    this.setState({ content: e.target.value });
  };

  onSave = taskId => () => {
    this.onEditModeToggle();
    if (this.props.content !== this.state.content) {
      this.props.onContentSave(taskId, this.state.content);
    }
  };

  onCancel = () => {
    this.onEditModeToggle();
  };

  render() {
    const {
      id,
      content,
      dateTime,
      important,
      completed,
      onImportantTask,
      onCompleteTask
    } = this.props;
    return (
      <Segment>
        {onCompleteTask && (
          <Icon
            name={`${completed ? "check circle" : "check circle outline"}`}
            onClick={() => onCompleteTask(id)}
          />
        )}
        {onImportantTask && (
          <Icon
            name={`${important ? "heart" : "heart outline"}`}
            onClick={() => onImportantTask(id)}
          />
        )}
        {this.state.editMode ? (
          <input
            value={this.state.content || content}
            onChange={e => this.onContentChange(e)}
          />
        ) : (
          <span onClick={() => this.onEditModeToggle()}>{content}</span>
        )}
        {this.state.editMode ? (
          <React.Fragment>
            <Icon name="check" onClick={this.onSave(id)} />
            <Icon name="undo" onClick={this.onCancel} />
          </React.Fragment>
        ) : null}
        <div className="Task-time">
          {moment(dateTime).format("D/M/YY HH:mm")}
        </div>
      </Segment>
    );
  }
}
