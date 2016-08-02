/**
 * Quinoa Editor Component
 * ========================
 *
 * Component holding the Draft.js Markdown editor.
 */
import React from 'react';
import {Editor as Draft} from 'draft-js';

export default function Editor(props) {
  const {
    editorState,
    onChange
  } = props;

  return <Draft editorState={editorState} onChange={onChange} />;
}
