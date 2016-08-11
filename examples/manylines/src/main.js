/**
 * Quinoa Manylines Application Endpoint
 * ======================================
 *
 * Rendering the application.
 */
import uuid from 'uuid';
import React from 'react';
import {render} from 'react-dom';
import Application from './containers/Application';
import Quinoa from '../../../src/quinoa';

// TODO: encapsulate in Quinoa
import {createState} from '../../../src/state';

let CurrentApplication = Application;

/**
 * Style.
 */
import 'normalize.css';
import 'codemirror/lib/codemirror.css';
import '../style/codemirror-theme.css';
import '../../../src/quinoa.css';
import '../style/manylines.scss';

/**
 * Creating our editor.
 */
function createSlide(data) {
  return {
    id: uuid.v4(),
    title: data.title || '',
    markdown: data.markdown || '',
    meta: {
      camera: {
        x: 0,
        y: 0,
        angle: 0,
        ratio: 1
      }
    }
  };
}

const DEFAULT_STATE = createState([
  createSlide({title: 'First slide'}),
  createSlide({title: 'Second slide'})
]);

const quinoa = new Quinoa({
  defaultState: DEFAULT_STATE,
  slideCreator: createSlide
});
window.quinoa = quinoa;

/**
 * Rendering logic.
 */
const mountNode = document.getElementById('mount');

// NOTE: it's probably better to plug the state somewhere else for perf reasons
function mapStore() {
  const {editor} = quinoa.getState();

  return {
    current: editor.current,
    camera: editor.slides[editor.current].meta.camera
  };
}

function renderApplication() {
  const group = (
    <CurrentApplication
      actions={quinoa.getActions()}
      editorComponent={quinoa.getEditorComponent()}
      {...mapStore()} />
  );

  render(group, mountNode);
}

renderApplication();

quinoa.subscribe(renderApplication);

/**
 * Hot-reloading.
 */
module.hot.accept('./containers/Application', function() {
  CurrentApplication = require('./containers/Application').default;
  renderApplication();
});

quinoa.hot(renderApplication);
