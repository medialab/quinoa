/**
 * Quinoa Draft Slide Component
 * =============================
 *
 * Component rendering the Draft.js editor for a single slide.
 */
import React, {Component} from 'react';
import {Editor} from 'draft-js';

export default class QuinoaDraftSlide extends Component {
  render() {
    const {
      id,
      draft,
      update
    } = this.props;

    // TODO: apply best practices to handler below
    return (
      <Editor
        editorState={draft}
        onChange={state => update(id, {draft: state})} />
    );
  }
}
