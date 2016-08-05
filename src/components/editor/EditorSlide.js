/**
 * Quinoa Editor Slide Component
 * ==============================
 *
 * Component responsible for a single slide's editor.
 */
import React from 'react';
import CodeMirror from 'react-codemirror';
import withHandlers from 'recompose/withHandlers';

/**
 * CodeMirror options.
 */
const CODEMIRROR_OPTIONS = {
  mode: 'markdown',
  placeholder: 'Text...',
  viewportMargin: Infinity,
  lineWrapping: true
};

/**
 * Component.
 */
const enhance = withHandlers({
  onChange: props => markdown => {
    props.update(props.id, {markdown});
  }
});

export default enhance(function EditorSlide(props) {
  const {
    markdown,
    onChange
  } = props;

  return (
    <div className="editor-slide">
      <div className="editor-slide-title"># Title</div>
      <CodeMirror
        value={markdown}
        onChange={onChange}
        options={CODEMIRROR_OPTIONS} />
    </div>
  );
});
