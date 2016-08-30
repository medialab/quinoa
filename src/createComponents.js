/**
 * Quinoa Editor Component Creator
 * ================================
 *
 * Function creating the React component rendering an arbitrary quinoa editor.
 */
import React from 'react';
import {Provider} from 'react-redux';
import QuinoaEditor from './containers/QuinoaEditor';
import QuinoaDraft from './containers/QuinoaDraft';

export default function createComponents(store) {
  return {
    editor() {
      return (
        <Provider store={store}>
          <QuinoaEditor />
        </Provider>
      );
    },
    draft() {
      return (
        <Provider store={store}>
          <QuinoaDraft />
        </Provider>
      );
    }
  };
}
