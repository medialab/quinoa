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
  onTitleChange: props => event => {
    props.update(props.id, {title: event.target.value});
  },
  onMarkdownChange: props => markdown => {
    props.update(props.id, {markdown});
  }
});

export default enhance(function EditorSlide(props) {
  const {
    title,
    markdown,
    onTitleChange,
    onMarkdownChange
  } = props;

  return (
    <div className="editor-slide">
      <div className="editor-slide-title">
        <table>
          <tbody>
            <tr>
              <td className="editor-slide-title-hashtag">#</td>
              <td>
                <textarea
                  className="editor-slide-title-input"
                  placeholder="Title of the slide..."
                  onChange={onTitleChange}
                  value={title} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <CodeMirror
        value={markdown}
        onChange={onMarkdownChange}
        options={CODEMIRROR_OPTIONS} />
    </div>
  );
});
