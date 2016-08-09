/**
 * Quinoa Markdown Parser Unit Tests
 * ==================================
 */
import assert from 'assert';
import parser from '../../src/parsers/markdown';
import {multiline} from '../helpers';

describe('parsers/markdown', function() {

  it('should correctly parse basic slides.', function() {

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

    const expectedState = {
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

    const editorState = parser(text);

    assert.deepEqual(editorState, expectedState);
  });
});
