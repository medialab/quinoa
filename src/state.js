/**
 * Quinoa Editor State Creation & Validation
 * ==========================================
 *
 * Functions able to create & validate expected store's states from various
 * data inputs.
 */
import {META_DELIMITER} from './constants';

/**
 * Create an editor state object from slides & resources.
 *
 * @param  {array}  slides - Slides list.
 * @return {object}        - Editor state object.
 */
export function createEditorState(slides = []) {
  const slidesMap = {};

  slides.forEach(slide => (slidesMap[slide.id] = slide));

  return {
    current: slides[0].id,
    slides: slidesMap,
    order: slides.map(slide => slide.id)
  };
}

/**
 * Create a full state from slides & resources.
 *
 * @param  {array}  slides - Slides list.
 * @return {object}        - Quinoa state object.
 */
export function createState(slides = []) {
  return {
    editor: createEditorState(slides)
  };
}

/**
 * Creates a list of slides from an editor state object.
 *
 * @param  {object} editorState - Editor state object.
 * @return {array}              - Slides list.
 */
export function slidesFromEditorState(editorState) {
  return editorState.order.map(id => editorState.slides[id]);
}

/**
 * Converts a list of slides into a markdown string.
 *
 * @param  {array}  slides - Slides list.
 * @return {string}        - Markdown.
 */
export function slidesToMarkdown(slides) {
 return slides
    .map(slide => {
      let string = '';

      // Handling the title
      string += '# ' + slide.title + '\n';

      // Handling the metadata
      string += META_DELIMITER + '\n';
      string += 'id: "' + slide.id + '"\n';

      for (const k in slide.meta)
        string += k + ': ' + JSON.stringify(slide.meta[k]) + '\n';

      string += META_DELIMITER + '\n';

      // Handling the markdown text
      string += slide.markdown;

      return string;
    })
    .join('\n\n');
}

/**
 * Validates the given slide object.
 *
 * @param  {object} slide - Target slide object.
 * @return {boolean}
 */
export function validateSlide(slide) {
  return (
    typeof slide === 'object' &&
    typeof slide.id === 'string' &&
    typeof slide.markdown === 'string' &&
    typeof slide.meta === 'object'
  );
}

