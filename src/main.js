/**
 * Quinoa endpoint
 * ================
 *
 * Endpoint of the client application.
 */
import React from 'react';
import {render} from 'react-dom';
import Application from './containers/Application.js';

/**
 * Style.
 */
import 'normalize.css';
import '../style/quinoa.scss';

/**
 * Rendering logic.
 */
const mountNode = document.getElementById('mount');

function renderApplication(Component) {
  render(<Component />, mountNode);
}

renderApplication(Application);

if (module.hot) {
  module.hot.accept('./containers/Application.js', function() {
    const NextApplication = require('./containers/Application.js').default;
    renderApplication(NextApplication);
  });
}
