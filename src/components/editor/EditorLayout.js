/**
 * Quinoa Editor Component
 * ========================
 *
 * Component organizing the different slide editors.
 */
import React from 'react';
import EditorSlide from './EditorSlide';

export default function EditorLayout({slides, updateSlide}) {

  return (
    <div>
      {slides.map(slide => (
        <EditorSlide
          key={slide.id}
          id={slide.id}
          markdown={slide.markdown}
          update={updateSlide} />
      ))}
    </div>
  );
}
