/**
 * Quinoa Action Creators
 * =======================
 */
import {
  SLIDE_CHANGE
} from './constants';

export function updateSlide(id, data) {
  return {type: SLIDE_CHANGE, id, data};
}
