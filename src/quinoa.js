/**
 * Quinoa Editor Endpoint
 * =======================
 *
 * File in charge of exporting the editor's full API enabling anyone to
 * implement its own quinoa editor in any webpage.
 */
import uuid from 'uuid';
import {bindActionCreators, combineReducers, createStore} from 'redux';
import {EditorState} from 'draft-js';
import * as actions from './actions';
import createComponents from './createComponents';
import createEditorReducer from './reducers/createEditorReducer';
import createResourcesReducer from './reducers/createResourcesReducer';
import {
  createState,
  slidesFromEditorState,
  slidesToMarkdown,
  validateSlide
} from './state';

/**
 * CodeMirror extensions.
 */

// NOTE: it should probably be good to make this customizable.
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/display/placeholder';

/**
 * Quinoa logic utils exposition.
 */
export const quinoaActions = actions;
export const quinoaCreateComponents = createComponents;
export const quinoaCreateEditorReducer = createEditorReducer;
export const quinoaCreateResourcesReducer = createResourcesReducer;
export const quinoaCreateState = createState;
export const quinoaSlidesFromEditorState = slidesFromEditorState;
export const quinoaSlidesToMarkdown = slidesToMarkdown;
export const quinoaValidateSlide = validateSlide;

/**
 * Defaults.
 */
function createDefaultSlide(data = {}) {
  return {
    id: uuid.v4(),
    title: data.title || '',
    markdown: data.markdown || '',
    draft: EditorState.createEmpty(),
    meta: {}
  };
}

// TODO: merge by composition
// TODO: pass current slide to the function so we can create from it
const DEFAULT_SLIDE = createDefaultSlide({title: 'My first slide'});

const DEFAULTS = {
  defaultState: createState([DEFAULT_SLIDE]),
  slideCreator: createDefaultSlide
};

/**
 * Quinoa class.
 *
 * @constructor
 * @params {object}   options              - Customizing options.
 * @params {object}   options.defaultState - Default editor state.
 * @params {function} options.slideCreator - Function used to create new slides.
 */
export default class Quinoa {
  constructor(options = {}) {

    // Options
    const createSlide = options.slideCreator || DEFAULTS.slideCreator;
    this.createSlide = () => {
      const slide = createSlide.apply(null, arguments);

      if (!validateSlide(slide))
        throw new Error('Quinoa.slideCreator: invalid slide.');

      return slide;
    };

    this.defaultState = options.defaultState || DEFAULTS.defaultState;

    // Properties
    const reducers = combineReducers({
      editor: createEditorReducer(this.createSlide),
      resources: createResourcesReducer()
    });

    this.store = createStore(reducers, this.defaultState);
    this.components = createComponents(this.store);
    this.actions = bindActionCreators(
      actions,
      this.store.dispatch
    );

    // Binding the store's subscribe method
    this.subscribe = this.store.subscribe.bind(this.store);

    // Handling hot reloading
    if (module.hot) {
      module.hot.accept('./createComponents', () => {
        const nextFn = require('./createComponents').default;
        this.components = nextFn(this.store);

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
   * Method used to return the attached editor component
   *
   * @return {Component} - The editor component.
   */
  getEditorComponent() {
    return this.components.editor;
  }

  /**
   * Method used to return the attached draft component.
   *
   * @return {Component} - The draft component.
   */
  getDraftComponentForSlide() {
    return this.components.draft;
  }

  /**
   * Method used to retrieve the editor's state as a markdown string.
   *
   * @return {string} - The editor's markdown.
   */
  getMarkdown() {
    const slides = slidesFromEditorState(this.getState().editor);
    return slidesToMarkdown(slides);
  }
}
