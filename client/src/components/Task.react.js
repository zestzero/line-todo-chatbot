import React from "react";
import { Segment, Icon, Button } from "semantic-ui-react";

const getTaskStyle = ({ completed }) => {
  return { tertiary: completed }
}
const Task = ({
  id,
  content,
  onCompleteTask,
  onImportantTask,
  onContentChange,
  onDeleteTask,
  completed
}) => {
  return (
    <Segment {...getTaskStyle({ completed })} compact>
      <Icon name="circle outline" onClick={() => onCompleteTask(id)} />
      <Icon name="heart outline" onClick={() => onImportantTask(id)} />
      <input value={content} onChange={e => onContentChange(e, id)} />
      <Button icon="remove" size='mini' floated="right" onClick={() => onDeleteTask(id)} />
    </Segment>
  );
};

Task.displayName = "Task";
export default Task;
