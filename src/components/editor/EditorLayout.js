/**
 * Quinoa Editor Component
 * ========================
 *
 * Component holding the Draft.js Markdown editor.
 */
import React from 'react';
import CodeMirror from 'react-codemirror';

// Importing the relevant mode
import 'codemirror/mode/markdown/markdown';

const CODEMIRROR_OPTIONS = {
  mode: 'markdown'
};

export default function Editor(props) {
  const {
    text,
    onChange
  } = props;

  return (
    <CodeMirror
      value={text}
      onChange={onChange}
      options={CODEMIRROR_OPTIONS} />
  );
}
