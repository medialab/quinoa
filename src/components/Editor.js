/**
 * Quinoa Editor Component
 * ========================
 *
 * Component holding the Draft.js Markdown editor.
 */
import React from 'react';
import {Editor as Draft, EditorState, CompositeDecorator} from 'draft-js';
import {withState} from 'recompose';
import {findall} from '../helpers';

const BOLD_REGEX = /(\*\*|__)(.*?)\1/g;

/**
 * Decorators for Markdown highlighting.
 */
const decorator = new CompositeDecorator([

  // Bold
  {
    strategy: (contentBlock, callback) => {
      const text = contentBlock.getText();

      const matches = findall(BOLD_REGEX, text);

      for (let i = 0, l = matches.length; i < l; i++) {
        const match = matches[i];
        callback(match.index, match.index + match[0].length);
      }
    },
    component: props => <strong>{props.children}</strong>
  }
]);

const enhance = withState(
  'editorState',
  'setEditorState',
  EditorState.createEmpty(decorator)
);

export default enhance(function Editor(props) {
  const {
    editorState,
    setEditorState
  } = props;

  const onChange = nextEditorState => setEditorState(nextEditorState);

  return <Draft editorState={editorState} onChange={onChange} />;
});
