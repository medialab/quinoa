/**
 * Quinoa Editor Reducer
 * ======================
 */
import uuid from 'uuid';
import {resolver} from '../helpers';
import {
  SLIDE_CHANGE
} from '../constants';

/**
 * Helpers.
 */
function createSlide(data = {}) {
  return {
    id: uuid.v4(),
    title: data.title || '',
    markdown: data.text || '',
    meta: {}
  };
}

/**
 * Defaults.
 */
const DEFAULT_TEXT = 'This is some **bold** and *emphasized* text...',
      DEFAULT_SLIDE = createSlide({markdown: DEFAULT_TEXT});

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
   * A slide's data was updated.
   */
  [SLIDE_CHANGE]: (state, {id, data}) => {
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
