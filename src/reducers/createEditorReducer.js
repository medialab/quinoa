/**
 * Quinoa Editor Reducer Creator
 * ==============================
 */
import merge from 'lodash/merge';
import {resolver} from '../helpers';
import {
  EDITOR_SELECT_SLIDE,
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
 *
 * The editor state is an object composed of the following keys:
 *  - "current": id of the current slide.
 *  - "slides": an index of the slides by id.
 *  - "order": a list of slide ids keeping track of slides' order
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
