/**
 * Quinoa Root Reducer
 * ====================
 */
import {combineReducers} from 'redux';
import editor from './editor';

const reducers = combineReducers({
  editor
});

export default reducers;
