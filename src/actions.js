/**
 * Quinoa Action Creators
 * =======================
 */
import {
  EDITOR_SELECT_SLIDE,
  EDITOR_SELECT_PREVIOUS_SLIDE,
  EDITOR_SELECT_NEXT_SLIDE,
  EDITOR_ADD_SLIDE,
  EDITOR_REMOVE_SLIDE,
  EDITOR_UPDATE_SLIDE,
  EDITOR_MOVE_SLIDE,

  RESOURCES_ADD_ITEM
} from './constants';

/**
 * Selecting a slide.
 */
export function selectSlide(id) {
  return {type: EDITOR_SELECT_SLIDE, id};
}
export function selectPreviousSlide() {
  return {type: EDITOR_SELECT_PREVIOUS_SLIDE};
}
export function selectNextSlide() {
  return {type: EDITOR_SELECT_NEXT_SLIDE};
}

/**
 * Adding a new slide.
 */
export function addSlide(data) {
  return {type: EDITOR_ADD_SLIDE, data};
}

/**
 * Removing a slide.
 */
export function removeSlide(id) {
  return {type: EDITOR_REMOVE_SLIDE, id};
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

/**
 * Adding an external resource.
 */
export function addResource(category, identifier, data) {
  return {type: RESOURCES_ADD_ITEM, category, identifier, data};
}
