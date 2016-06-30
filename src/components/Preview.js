/**
 * Quinoa Preview Component
 * =========================
 *
 * Component displaying the editor's rendered Markdown.
 */
import React from 'react';
import {Parser} from 'commonmark';
import Renderer from 'commonmark-react-renderer';

const parser = new Parser(),
      renderer = new Renderer();

function renderMarkdown(markdown) {
  const ast = parser.parse(markdown);
  return renderer.render(ast);
}

export default function Preview({markdown = ''}) {
  const elements = renderMarkdown(markdown);

  return (
    <div>
      {elements}
    </div>
  );
}
