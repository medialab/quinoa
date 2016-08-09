/**
 * Quinoa Markdown Renderer
 * =========================
 *
 * Renderer taking a Quinoa editor state & returning a single markdown string.
 */
export default function markdownRenderer(slides) {
 return slides
    .map(slide => {
      let string = '';

      // Handling the title
      string += '# ' + slide.title + '\n';

      // Handling the metadata
      string += '-~-\n';
      string += 'id: "' + slide.id + '"\n';

      for (const k in slide.meta)
        string += k + ': ' + JSON.stringify(slide.meta[k]) + '\n';

      string += '-~-\n';

      // Handling the markdown text
      string += slide.markdown;

      return string;
    })
    .join('\n\n');
}
