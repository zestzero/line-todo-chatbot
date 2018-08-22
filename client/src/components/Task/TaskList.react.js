import _ from "lodash";
import React from "react";
import { SegmentGroup, Segment } from "semantic-ui-react";
import Task from "./Task.react";

const TaskList = props => (
  <SegmentGroup>
    <Segment inverted color={props.titleColor}>
      {props.title}
    </Segment>
    {_.map(props.tasks, task => (
      <Task key={task.id} {...task} {...props} />
    ))}
  </SegmentGroup>
);
export default TaskList;
