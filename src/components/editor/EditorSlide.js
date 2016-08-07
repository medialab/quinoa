/**
 * Quinoa Editor Slide Component
 * ==============================
 *
 * Component responsible for a single slide's editor.
 */
import React from 'react';
import CodeMirror from 'react-codemirror';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import draggable from './draggable';

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
const enhance = compose(
  withHandlers({
    onTitleChange: props => event => {
      props.update(props.id, {title: event.target.value});
    },
    onMarkdownChange: props => markdown => {
      props.update(props.id, {markdown});
    },
    onMove: props => (indexBefore, indexAfter) => {
      props.move(props.id, indexBefore, indexAfter);
    }
  }),
  draggable
);

export default enhance(function EditorSlide(props) {
  const {
    index,
    title,
    markdown,
    connectDragPreview,
    connectDragSource,
    connectDropTarget,
    onTitleChange,
    onMarkdownChange,
    onMove
  } = props;

  return connectDragPreview(connectDropTarget(
    <div className="editor-slide">
      <div className="editor-slide-title">
        <table>
          <tbody>
            <tr>
              {connectDragSource(<td className="editor-slide-title-hashtag">#</td>)}
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
  ));
});
