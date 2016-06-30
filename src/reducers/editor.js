/**
 * Quinoa Editor Reducer
 * ======================
 */
import {EditorState} from 'draft-js';
import {resolver} from '../helpers';
import {
  EDITOR_CHANGE
} from '../constants';

const defaultState = {
  draft: EditorState.createEmpty()
};

export default resolver(defaultState, {
  [EDITOR_CHANGE]: (state, action) => {
    return {
      ...state,
      draft: action.draft
    };
  }
});
