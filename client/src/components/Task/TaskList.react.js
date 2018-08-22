import _ from "lodash";
import React from "react";
import { SegmentGroup, Segment } from "semantic-ui-react";
import Task from "./Task.react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./TaskList.css";

const renderDraggableItems = (props) => _.map(
  props.tasks,
  (task, index) =>
    props.isDropDisabled ? (
      <Task key={task.id} {...task} {...props} />
    ) : (
      <Draggable
        key={task.id}
        draggableId={task.id}
        index={index}
      >
        {(dragProvided, dragSnapshot) => (
          <div
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
          >
            <Task
              key={task.id}
              {...task}
              {...props}
              isDragging={dragSnapshot.isDragging}
              provided={dragProvided}
            />
          </div>
        )}
      </Draggable>
    )
)

const TaskList = props => (
  <SegmentGroup>
    <Segment inverted color={props.titleColor}>
      {props.title}
    </Segment>
    <Droppable droppableId={props.listId} type={props.listId}>
      {(dropProvided, dropSnapshot) => (
        <div
          className={`${dropSnapshot.isDraggingOver ? "dragging" : ""}`}
          ref={dropProvided.innerRef}
          {...dropProvided.droppableProps}
        >
          {renderDraggableItems(props)}
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  </SegmentGroup>
);
export default TaskList;
