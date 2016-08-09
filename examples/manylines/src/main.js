/**
 * Quinoa Manylines Application Endpoint
 * ======================================
 *
 * Rendering the application.
 */
import Quinoa from '../../../src';

/**
 * Style.
 */
import 'normalize.css';
import 'codemirror/lib/codemirror.css';
import '../style/codemirror-theme.css';
import '../../../src/quinoa.scss';

/**
 * Creating our editor.
 */
const editor = new Quinoa();
window.quinoa = editor;

const mountNode = document.getElementById('mount');

editor.render(mountNode);

module.hot.accept();
