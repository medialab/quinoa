/**
 * Quinoa Action Creators
 * =======================
 */
import {
  EDITOR_ADD_SLIDE,
  EDITOR_UPDATE_SLIDE
} from './constants';

/**
 * Add a new slide.
 */
export function addSlide(data) {
  return {type: EDITOR_ADD_SLIDE, data};
}

/**
 * Edit the data of an arbitrary slide.
 */
export function updateSlide(id, data) {
  return {type: EDITOR_UPDATE_SLIDE, id, data};
}
