/**
 * Quinoa Slide Title Component
 * =============================
 *
 * Textarea holding the title of a slide.
 */
import React from 'react';

export default function QuinoaSlideTitle(props) {
  const {
    onChange,
    value
  } = props;

  return (
    <textarea
      className="quinoa-slide-title-input"
      placeholder="Title of the slide..."
      onChange={onChange}
      value={value} />
  );
}
