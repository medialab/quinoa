/**
 * Quinoa Editor Slide Component
 * ==============================
 *
 * Component responsible for a single slide's editor.
 */
import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import cls from 'classnames';

import draggable from './draggable';
import QuinoaSlideTitle from './QuinoaSlideTitle';

/**
 * CodeMirror options.
 */
const CODEMIRROR_OPTIONS = {
  mode: 'markdown',
  placeholder: 'Text...',
  viewportMargin: Infinity,
  lineWrapping: true,
  extraKeys: {
    Tab: false
  }
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
    },
    onRemove: props => () => {
      props.remove(props.id);
    }
  }),
  draggable
);

export default enhance(class QuinoaEditorSlide extends Component {
  render() {
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
      onSelect,
      onRemove
    } = this.props;

    const opacity = isDragging ? 0 : 1;

    // TODO: clean this up for purity
    const editorOptions = {
      ...CODEMIRROR_OPTIONS,
      extraKeys: {
        ...CODEMIRROR_OPTIONS.extraKeys,
        Down: editor => {
          const doc = editor.getDoc(),
                cursor = doc.getCursor(),
                lines = doc.lineCount();

          if (cursor.line === lines - 1) {
            this.props.selectNext();
            return;
          }

          editor.execCommand('goLineDown');
        },
        // Up: editor => {
        //   const doc = editor.getDoc(),
        //         cursor = doc.getCursor();

        //   if (!cursor.line) {
        //     this.title.focus();
        //     return;
        //   }

        //   editor.execCommand('goLineUp');
        // }
      }
    };

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
                  <QuinoaSlideTitle value={title} onChange={onTitleChange} />
                </td>
                <td onClick={onRemove}>
                  x
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeMirror
          ref={codemirrorElement => (this.codemirror = codemirrorElement)}
          value={markdown}
          onChange={onMarkdownChange}
          options={editorOptions} />
      </div>
    ));
  }
});
