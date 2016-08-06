/**
 * Quinoa Editor Draggable Component
 * ==================================
 *
 * Component used to wrap the slide components and make them sortable.
 */
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import compose from 'recompose/compose';

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index,
          hoverIndex = props.index;

    // If itself, we break
    if (dragIndex === hoverIndex)
      return;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.onMove(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // monitor.getItem().index = hoverIndex;
  }
};

const enhance = compose(
  DropTarget('SLIDE', target, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('SLIDE', source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
);

export default enhance(class EditorDraggable extends Component {
  render() {
    const {
      children,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;

    return connectDragSource(connectDropTarget(children));
  }
});
