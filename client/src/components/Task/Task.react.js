import React from "react";
import { Segment, Icon } from "semantic-ui-react";

const Task = ({
  id,
  content,
  completed,
  important,
  onCompleteTask,
  onImportantTask,
  onContentChange
}) => {
  return (
    <Segment compact>
      {onCompleteTask && (
        <Icon
          name={`${completed ? "circle" : "circle outline"}`}
          onClick={() => onCompleteTask(id)}
        />
      )}
      {onImportantTask && (
        <Icon
          name={`${important ? "heart" : "heart outline"}`}
          onClick={() => onImportantTask(id)}
        />
      )}
      {onContentChange ? (
        <input value={content} onChange={e => onContentChange(e, id)} />
      ) : (
        content
      )}
    </Segment>
  );
};

Task.displayName = "Task";
export default Task;
