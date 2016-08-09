/**
 * Quinoa Editor Component Creator
 * ================================
 *
 * Function creating the React component rendering an arbitrary quinoa editor.
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import QuinoaEditor from './containers/QuinoaEditor';

export default function createComponent(store) {
  let EditorComponent = QuinoaEditor;

  // Handling hot-reloading
  module.hot.accept('./containers/QuinoaEditor', function() {
    EditorComponent = require('./containers/QuinoaEditor').default;
  });

  return class WrappedQuinoaEditor extends Component {
    render() {
      return (
        <Provider store={store}>
          <EditorComponent />
        </Provider>
      );
    }
  }
}
