/**
 * Quinoa Action Creators
 * =======================
 */
import {
  EDITOR_ADD_SLIDE,
  EDITOR_UPDATE_SLIDE,
  EDITOR_MOVE_SLIDE
} from './constants';

/**
 * Adding a new slide.
 */
export function addSlide(data) {
  return {type: EDITOR_ADD_SLIDE, data};
}

/**
 * Editing the data of an arbitrary slide.
 */
export function updateSlide(id, data) {
  return {type: EDITOR_UPDATE_SLIDE, id, data};
}

/**
 * Moving a slide.
 */
export function moveSlide(id, indexBefore, indexAfter) {
  return {type: EDITOR_MOVE_SLIDE, id, indexBefore, indexAfter};
}
