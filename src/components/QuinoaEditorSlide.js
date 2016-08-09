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
import cls from 'classnames';
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
    },
    onSelect: props => () => {
      if (!props.isCurrent)
        props.select(props.id);
    }
  }),
  draggable
);

export default enhance(function QuinoaEditorSlide(props) {
  const {
    title,
    markdown,
    isCurrent,

    isDragging,
    connectDragPreview,
    connectDragSource,
    connectDropTarget,

    onTitleChange,
    onMarkdownChange,
    onSelect
  } = props;

  const opacity = isDragging ? 0 : 1;

  return connectDragPreview(connectDropTarget(
    <div
      className={cls('quinoa-slide', {selected: isCurrent})}
      style={{opacity}}
      onClick={onSelect}>
      <div className="quinoa-slide-title">
        <table>
          <tbody>
            <tr>
              {connectDragSource(<td className="quinoa-slide-title-hashtag">#</td>)}
              <td>
                <textarea
                  className="quinoa-slide-title-input"
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
