/**
 * Quinoa Editor Reducer Creator
 * ==============================
 */
import merge from 'lodash/merge';
import {resolver} from '../helpers';
import {stateFromMarkdown} from 'draft-js-import-markdown';
import {stateToMarkdown} from 'draft-js-export-markdown';
import {EditorState} from 'draft-js';
import {
  EDITOR_SELECT_SLIDE,
  EDITOR_SELECT_PREVIOUS_SLIDE,
  EDITOR_SELECT_NEXT_SLIDE,
  EDITOR_ADD_SLIDE,
  EDITOR_UPDATE_SLIDE,
  EDITOR_MOVE_SLIDE
} from '../constants';

const DEFAULT_STATE = {
  current: null,
  slides: {},
  order: []
};

/**
 * Editor reducer forge.
 */
export default function(createSlide) {
  return resolver(DEFAULT_STATE, {

    /**
     * A slide was selected.
     */
    [EDITOR_SELECT_SLIDE]: (state, {id}) => {
      return {
        ...state,
        current: id
      };
    },

    [EDITOR_SELECT_PREVIOUS_SLIDE]: (state) => {
      const index = state.order.indexOf(state.current);

      return {
        ...state,
        current: state.order[index - 1] || state.current
      };
    },

    [EDITOR_SELECT_NEXT_SLIDE]: (state) => {
      const index = state.order.indexOf(state.current);

      return {
        ...state,
        current: state.order[index + 1] || state.current
      };
    },

    /**
     * A slide was added.
     */
    [EDITOR_ADD_SLIDE]: (state, {data}) => {
      const slide = createSlide(data);

      // Updating state
      return {
        ...state,
        current: slide.id,
        order: state.order.slice().concat(slide.id),
        slides: {
          ...state.slides,
          [slide.id]: slide
        }
      };
    },

    /**
     * A slide's data was updated.
     */
    [EDITOR_UPDATE_SLIDE]: (state, {id, data}) => {
      const currentSlide = state.slides[id];

      // If data contains markdown & no draft, we update the draft
      if ('markdown' in data && !('draft' in data)) {
        const content = stateFromMarkdown(data.markdown);

        data = merge({}, data, {draft: EditorState.createWithContent(content)});
      }

      // If data contains draft & no markdown, we update the markdown
      else if ('draft' in data && !('markdown' in data)) {
        const content = data.draft.getCurrentContent();

        data = merge({}, data, {markdown: stateToMarkdown(content)});
      }

      // Merging current slide's data & payload's
      const updatedSlide = merge({}, currentSlide, data);

      // Updating state
      return {
        ...state,
        slides: {
          ...state.slides,
          [id]: updatedSlide
        }
      };
    },

    /**
     * A slide was moved.
     */
    [EDITOR_MOVE_SLIDE]: (state, {indexBefore, indexAfter}) => {
      const id = state.order[indexBefore];

      const order = state.order.slice();
      order.splice(indexBefore, 1);
      order.splice(indexAfter, 0, id);

      return {
        ...state,
        order
      };
    }
  });
}
