/**
 * Quinoa Editor Endpoint
 * =======================
 *
 * File in charge of exporting the editor's full API enabling anyone to
 * implement its own quinoa editor in any webpage.
 */
import React from 'react';
import {bindActionCreators, createStore} from 'redux';
import * as actions from './actions';
import reducers from './reducers';
import createComponent from './createComponent';
import markdownRenderer from './renderers/markdown';

/**
 * CodeMirror extensions.
 */

// NOTE: it should probably be good to make this customizable.
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/display/placeholder';

/**
 * Quinoa class.
 *
 * @constructor
 */
export default class Quinoa {
  constructor() {

    // Properties
    this.store = createStore(reducers, {});
    this.component = createComponent(this.store);
    this.actions = bindActionCreators(
      actions,
      this.store.dispatch
    );

    // Binding the store's subscribe method
    this.subscribe = this.store.subscribe.bind(this.store);

    // Handling hot reloading
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextReducers = require('./reducers').default;
        this.store.replaceReducer(nextReducers);

        this.fireHotUpdate();
      });

      module.hot.accept('./createComponent', () => {
        const nextFn = require('./createComponent').default;
        this.component = nextFn(this.store);

        this.fireHotUpdate();
      });

      module.hot.accept('./actions', () => {
        const nextActions = require('./actions');
        this.actions = bindActionCreators(
          nextActions,
          this.store.dispatch
        );

        this.fireHotUpdate();
      });

      // Handy hot-reloading subscriber
      let callback;

      this.hot = fn => {
        callback = fn;
        return () => {
          callback = null;
        };
      };

      this.fireHotUpdate = () => {
        if (typeof callback === 'function')
          callback();
      };
    }
  }

  /**
   * Method used to return the attached Redux store.
   *
   * @return {ReduxStore} - The store.
   */
  getStore() {
    return this.store;
  }

  /**
   * Shortcut to access the store's data.
   *
   * @return {Object} - The store's data.
   */
  getState() {
    return this.store.getState();
  }

  /**
   * Method used to return the attached actions.
   *
   * @return {object} - The editor's actions.
   */
  getActions() {
    return this.actions;
  }

  /**
   * Method used to return the attached React component.
   *
   * @return {QuinoaEditor} - The component.
   */
  getComponent() {
    return this.component;
  }

  /**
   * Method used to retrieve the editor's state as a markdown string.
   *
   * @return {string} - The editor's markdown.
   */
  getMarkdown() {
    const editorState = this.getState().editor;
    return markdownRenderer(editorState);
  }
}
