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

      selectNext,
      selectPrevious
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
        Up: editor => {
          const doc = editor.getDoc(),
                cursor = doc.getCursor();

          if (!cursor.line) {
            this.title.focus();
            return;
          }

          editor.execCommand('goLineUp');
        }
      }
    };

    const titleKeyDown = e => {
      if (e.keyCode === 40) {
        const editor = this.codemirror.getCodeMirror();

        editor.focus();
      }

      else if (e.keyCode === 38) {
        this.props.selectPrevious();
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
                  <textarea
                    ref={textarea => this.title = textarea}
                    className="quinoa-slide-title-input"
                    placeholder="Title of the slide..."
                    onChange={onTitleChange}
                    onKeyDown={titleKeyDown}
                    value={title} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeMirror
          ref={codemirrorElement => this.codemirror = codemirrorElement}
          value={markdown}
          onChange={onMarkdownChange}
          options={editorOptions} />
      </div>
    ));
  }
});
