/**
 * Quinoa Action Creators
 * =======================
 */
import {
  EDITOR_CHANGE
} from './constants';

export function updateEditor(text) {
  return {type: EDITOR_CHANGE, text};
}
