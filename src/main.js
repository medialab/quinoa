/**
 * Quinoa endpoint
 * ================
 *
 * Endpoint of the client application.
 */
import React from 'react';
import {render} from 'react-dom';
import Application from './containers/Application.js';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';

/**
 * Style.
 */
import 'normalize.css';
import 'codemirror/lib/codemirror.css';
import '../style/codemirror-theme.css';
import '../style/quinoa.scss';

/**
 * Store logic.
 */
const store = createStore(reducers, {}, window.devToolsExtension && window.devToolsExtension());

/**
 * Rendering logic.
 */
const mountNode = document.getElementById('mount');

function renderApplication(Component) {
  render(<Provider store={store}><Component /></Provider>, mountNode);
}

renderApplication(Application);

if (module.hot) {

  // The components
  module.hot.accept('./containers/Application.js', function() {
    const NextApplication = require('./containers/Application.js').default;
    renderApplication(NextApplication);
  });

  // The redux store
  module.hot.accept('./reducers', function() {
    const nextReducers = require('./reducers').default;
    store.replaceReducer(nextReducers);
  });
}
