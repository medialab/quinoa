/**
 * Quinoa Resources Reducer Creator
 * =================================
 */
import {resolver} from '../helpers';
import {
  RESOURCES_ADD_ITEM
} from '../constants';

const DEFAULT_STATE = {
  indexes: {}
};

/**
 * Resources reducer forge.
 */
export default function() {
  return resolver(DEFAULT_STATE, {

    /**
     * An external resource was added.
     */
    [RESOURCES_ADD_ITEM]: (state, {category, identifier, data}) => {
      const indexes = {...state.indexes};

      if (!(category in indexes))
        indexes[category] = {};

      indexes[category][identifier] = data;

      return {indexes};
    }
  });
}
