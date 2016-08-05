/**
 * Quinoa Editor Reducer
 * ======================
 */
import uuid from 'uuid';
import {resolver} from '../helpers';
import {
  EDITOR_ADD_SLIDE,
  EDITOR_UPDATE_SLIDE
} from '../constants';

/**
 * Helpers.
 */
function createSlide(data = {}) {
  return {
    id: uuid.v4(),
    title: data.title || '',
    markdown: data.markdown || '',
    meta: {}
  };
}

/**
 * Defaults.
 */
const DEFAULT_SLIDE = createSlide();

const defaultState = {
  current: DEFAULT_SLIDE.id,
  slides: {
    [DEFAULT_SLIDE.id]: DEFAULT_SLIDE
  },
  order: [DEFAULT_SLIDE.id]
};

/**
 * Reducer.
 */
export default resolver(defaultState, {

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
    const updatedSlide = {
      ...currentSlide,
      ...data
    };

    // Updating state
    return {
      ...state,
      slides: {
        ...state.slides,
        [id]: updatedSlide
      }
    };
  }
});
