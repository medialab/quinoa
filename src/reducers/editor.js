/**
 * Quinoa Editor Reducer
 * ======================
 */
import {resolver} from '../helpers';
import {
  EDITOR_CHANGE
} from '../constants';

const TEMP_DEFAULT_TEXT = '# First slide\n```\nmeta: value\n```\n\nThis is some **bold** and *emphasized* text...';

const defaultState = {
  text: TEMP_DEFAULT_TEXT
};

export default resolver(defaultState, {
  [EDITOR_CHANGE]: (state, payload) => {

    return {
      ...state,
      text: payload.text
    };
  }
});
