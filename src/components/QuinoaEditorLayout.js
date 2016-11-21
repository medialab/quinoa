/* eslint react/prefer-stateless-function: 0 */
/**
 * Quinoa Editor Component
 * ========================
 *
 * Component organizing the different slide editors.
 */
import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QuinoaEditorSlide from './QuinoaEditorSlide';

const context = DragDropContext(HTML5Backend);

function QuinoaEditorAddSlideButton({addSlide}) {
  return (
    <button className="quinoa-macro-button" onClick={addSlide}>Add Slide</button>
  );
}

export default context(class QuinoaEditorLayout extends Component {
  render() {
    const {
      current,
      slides,
      actions
    } = this.props;

    return (
      <div className="quinoa-layout">
        {slides.map((slide, index) => (
          <QuinoaEditorSlide
            index={index}
            key={slide.id}
            id={slide.id}
            title={slide.title}
            markdown={slide.markdown}
            isCurrent={slide.id === current}
            select={actions.selectSlide}
            remove={actions.removeSlide}
            selectPrevious={actions.selectPreviousSlide}
            selectNext={actions.selectNextSlide}
            update={actions.updateSlide}
            move={actions.moveSlide} />
        ))}
        <QuinoaEditorAddSlideButton addSlide={actions.addSlide} />
      </div>
    );
  }
});
