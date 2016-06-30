/**
 * Quinoa Action Creators
 * =======================
 */
import {
  EDITOR_CHANGE
} from './constants';

export function updateEditor(draft) {
  return {type: EDITOR_CHANGE, draft};
}
