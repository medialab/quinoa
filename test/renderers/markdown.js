/**
 * Quinoa Markdown Renderer Unit Tests
 * ====================================
 */
import assert from 'assert';
import renderer from '../../src/renderers/markdown';
import parser from '../../src/parsers/markdown';
import {multiline} from '../helpers';

describe('renderers/markdown', function() {

  const state = {
    slides: {
      'one': {
        id: 'one',
        title: 'First slide',
        markdown: 'This is some **markdown**.\n\nThis is wonderful',
        meta: {
          location: 'garden',
          information: {x: 13, y: 45}
        }
      },
      'two': {
        id: 'two',
        title: 'Second slide',
        markdown: '## Consideration\n\nBeware of what you wish for.',
        meta: {
          location: 'house',
          information: {x: 15, y: -3},
          camera: {
            name: 'main',
            angle: 0,
            x: 45,
            y: 89,
            ratio: 1.898
          }
        }
      }
    },
    order: ['one', 'two']
  };

  const text = multiline`
    # First slide
    -~-
    id: "one"
    location: "garden"
    information: {"x":13,"y":45}
    -~-
    This is some **markdown**.

    This is wonderful

    # Second slide
    -~-
    id: "two"
    location: "house"
    information: {"x":15,"y":-3}
    camera: {"name":"main","angle":0,"x":45,"y":89,"ratio":1.898}
    -~-
    ## Consideration

    Beware of what you wish for.
  `;

  it('should correctly render basic slides.', function() {
    const markdown = renderer(state);

    assert.strictEqual(markdown, text);
  });

  it('parsing the renderer output should return the original state.', function() {
    assert.deepEqual(state, parser(renderer(state)));
  });
});
