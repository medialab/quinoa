/**
 * Quinoa Markdown Renderer Unit Tests
 * ====================================
 */
import assert from 'assert';
import renderer from '../../src/renderers/markdown';

function multiline([string]) {
  return string
    .split('\n')
    .slice(1, -1)
    .map(s => s.trim())
    .join('\n');
}

describe('renderers/markdown', function() {

  it('should correctly render basic slides.', function() {
    const state = {
      slides: {
        1: {
          id: 1,
          title: 'First slide',
          markdown: 'This is some **markdown**.\n\nThis is wonderful',
          meta: {
            location: 'garden',
            information: {x: 13, y: 45}
          }
        },
        2: {
          id: 2,
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
      order: [1, 2]
    };

    const text = multiline`
      # First slide
      -~-
      id: "1"
      location: "garden"
      information: {"x":13,"y":45}
      -~-
      This is some **markdown**.

      This is wonderful

      # Second slide
      -~-
      id: "2"
      location: "house"
      information: {"x":15,"y":-3}
      camera: {"name":"main","angle":0,"x":45,"y":89,"ratio":1.898}
      -~-
      ## Consideration

      Beware of what you wish for.
    `;

    const markdown = renderer(state);

    assert.strictEqual(markdown, text);
  });
});
