/**
 * Quinoa Editor Decorator
 * ========================
 *
 * Draft.js composite decorator in charge of highlighting inline markdown
 * elements such as bold or emphasized text, for instance.
 */
import React from 'react';
import {CompositeDecorator} from 'draft-js';
import {findall} from '../helpers';

/**
 * Regular expressions.
 */

// NOTE: those regexes are propbably not robust enough
const BOLD_REGEX = /(\*\*|__)([^\1]+)\1/g,
      EMPHASIS_REGEX = /([*_])([^\1]+)\1/g;

/**
 * Helpers.
 */
function createTextHighlighter(regex) {
  return function(contentBlock, callback) {
    const text = contentBlock.getText();

    const matches = findall(regex, text);

    for (let i = 0, l = matches.length; i < l; i++) {
      const match = matches[i];
      callback(match.index, match.index + match[0].length);
    }
  };
}

/**
 * Bold.
 */
const BOLD = {
  strategy: createTextHighlighter(BOLD_REGEX),
  component: props => <strong>{props.children}</strong>
};

/**
 * Emphasis.
 */
const EMPHASIS = {
  strategy: createTextHighlighter(EMPHASIS_REGEX),
  component: props => <em>{props.children}</em>
};

/**
 * Exporting the composite decorator.
 */
const decorator = new CompositeDecorator([
  BOLD,
  EMPHASIS
]);

export default decorator;
