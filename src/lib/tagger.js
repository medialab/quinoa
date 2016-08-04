/**
 * Quinoa Block Tagger
 * ====================
 *
 * Experimental function designed to peruse the blocks from a Draft.js'
 * ContentState object in order to tag them relatively to their markdown
 * content.
 */
import {EditorState} from 'draft-js';

export default function tag(state) {
  const contentState = state.getCurrentContent(),
        blockMap = contentState.getBlockMap();

  // Iterating through the blocks
  let editedContentState = contentState;
  let blockType = 'unstyled';

  const editedBlockMap = blockMap.forEach((block, key) => {
    const text = block.getText();

    if (text === '---')
      return block.set('type', 'h1');

    return block.set('type', blockType);
  });

  return EditorState.push(
    state,
    editedContentState,
    'block-type-change'
  );
}
