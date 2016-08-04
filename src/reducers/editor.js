/**
 * Quinoa Editor Reducer
 * ======================
 */
import {EditorState, ContentState} from 'draft-js';
import {resolver} from '../helpers';
import decorator from '../lib/decorator';
import tag from '../lib/tagger';
import {
  EDITOR_CHANGE
} from '../constants';

const TEMP_DEFAULT_TEXT = '# First slide\n```\nmeta: value\n```\n\nThis is some **bold** and *emphasized* text...';

const content = ContentState.createFromText(TEMP_DEFAULT_TEXT);

const defaultState = {
  draft: EditorState.createWithContent(content, decorator)
};

// TODO: only tag on relevant change
export default resolver(defaultState, {
  [EDITOR_CHANGE]: (state, payload) => {

    const taggedEditorState = tag(payload.draft);

    return {
      ...state,
      draft: taggedEditorState
    };
  }
});
