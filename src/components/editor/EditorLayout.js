/**
 * Quinoa Editor Component
 * ========================
 *
 * Component organizing the different slide editors.
 */
import React from 'react';
import EditorSlide from './EditorSlide';

function EditorAddSlideButton({addSlide}) {
  return (
    <button className="editor-macro-button" onClick={addSlide}>Add Slide</button>
  );
}

export default function EditorLayout(props) {
  const {
    slides,
    addSlide,
    updateSlide
  } = props;

  return (
    <div>
      {slides.map(slide => (
        <EditorSlide
          key={slide.id}
          id={slide.id}
          title={slide.title}
          markdown={slide.markdown}
          update={updateSlide} />
      ))}
      <EditorAddSlideButton addSlide={addSlide} />
    </div>
  );
}
