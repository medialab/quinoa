/**
 * Quinoa Editor Component Creator
 * ================================
 *
 * Function creating the React component rendering an arbitrary quinoa editor.
 */
import React from 'react';
import {Provider} from 'react-redux';
import QuinoaEditor from './containers/QuinoaEditor';

export default function createComponents(store) {
  let EditorComponent = QuinoaEditor;

  return {
    editor: function() {
      return (
        <Provider store={store}>
          <EditorComponent />
        </Provider>
      );
    }
  };
}
