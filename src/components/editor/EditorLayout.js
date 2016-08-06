/**
 * Quinoa Editor Component
 * ========================
 *
 * Component organizing the different slide editors.
 */
import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import EditorSlide from './EditorSlide';

const context = DragDropContext(HTML5Backend);

function EditorAddSlideButton({addSlide}) {
  return (
    <button className="editor-macro-button" onClick={addSlide}>Add Slide</button>
  );
}

export default context(class EditorLayout extends Component {
  render() {
    const {
      slides,
      addSlide,
      updateSlide,
      moveSlide
    } = this.props;

    return (
      <div>
        {slides.map((slide, index) => (
          <EditorSlide
            index={index}
            key={slide.id}
            id={slide.id}
            title={slide.title}
            markdown={slide.markdown}
            update={updateSlide}
            move={moveSlide} />
        ))}
        <EditorAddSlideButton addSlide={addSlide} />
      </div>
    );
  }
});
