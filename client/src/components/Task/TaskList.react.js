import _ from "lodash";
import React from "react";
import { SegmentGroup, Segment } from "semantic-ui-react";
import Task from "./Task.react";

const TaskList = ({
  title,
  tasks,
  onCompleteTask,
  onImportantTask,
  onContentChange,
  titleColor
}) => (
  <SegmentGroup>
    <Segment inverted color={titleColor}>{title}</Segment>
    {_.map(tasks, task => (
      <Task
        key={task.id}
        {...task}
        onCompleteTask={onCompleteTask}
        onImportantTask={onImportantTask}
        onContentChange={onContentChange}
      />
    ))}
  </SegmentGroup>
);
export default TaskList;
