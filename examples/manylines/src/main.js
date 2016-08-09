/**
 * Quinoa Manylines Application Endpoint
 * ======================================
 *
 * Rendering the application.
 */
import React from 'react';
import {render} from 'react-dom';
import Application from './containers/Application';
import Quinoa from '../../../src';

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
const editor = new Quinoa();
window.quinoa = editor;

/**
 * Rendering logic.
 */
const mountNode = document.getElementById('mount');

function renderApplication() {
  const group = (
    <CurrentApplication
      actions={editor.getActions()}
      editorComponent={editor.getComponent()} />
  );

  render(group, mountNode);
}

renderApplication();

/**
 * Hot-reloading.
 */
module.hot.accept('./containers/Application', function() {
  CurrentApplication = require('./containers/Application').default;
  renderApplication();
});

editor.hot(renderApplication);
