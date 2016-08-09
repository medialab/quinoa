/**
 * Quinoa Editor State Creation & Validation
 * ==========================================
 *
 * Functions able to create & validate expected store's states from various
 * data inputs.
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

export function createState(slides = []) {
  return {
    editor: createEditorState(slides)
  };
}

export function slidesFromEditorState(editorState) {
  return editorState.order.map(id => editorState.slides[id]);
}

export function validateSlide(target) {
  return (
    typeof target === 'object' &&
    typeof target.id === 'string' &&
    typeof target.markdown === 'string' &&
    typeof target.meta === 'object'
  );
}
