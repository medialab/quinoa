/**
 * Quinoa Markdown Parser
 * =======================
 *
 * Parser creating an editor state from a markdown document.
 */
const SPLITTER = /(?=#\s+.+\n-~-)/,
      TITLE = /#\s+(.+)/,
      META = /([^:]+):\s+(.+)$/,
      END = /\n\n$/;

export default function markdownParser(string) {
  return string
    .split(SPLITTER)
    .map(text => {
      const lines = text.split('\n');

      // Parsing title
      const title = lines[0].match(TITLE)[1];
      lines.shift();

      // Parsing meta
      const meta = {};
      let id;
      lines.shift();

      while (lines[0] !== '-~-') {
        const [, key, json] = lines[0].match(META);

        if (key === 'id')
          id = JSON.parse(json);
        else
          meta[key] = JSON.parse(json);

        lines.shift();
      }

      lines.shift();

      return {
        id,
        title,
        markdown: lines.join('\n').replace(END, ''),
        meta
      };
    });
}
