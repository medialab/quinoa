/**
 * Quinoa Draft Slide Component
 * =============================
 *
 * Component rendering the Draft.js editor for a single slide.
 */
import React, {Component} from 'react';
import {Editor} from 'draft-js';

import QuinoaSlideTitle from './QuinoaSlideTitle';

export default class QuinoaDraftSlide extends Component {
  render() {
    const {
      id,
      slide,
      draft,
      update
    } = this.props;

    // TODO: apply best practices to handler below
    return (
      <div>
        <div className="quinoa-slide-title">
          <QuinoaSlideTitle value={slide.title} onChange={e => update(id, {title: e.target.value})} />
        </div>
        <Editor
          editorState={draft}
          onChange={state => update(id, {draft: state})} />
      </div>
    );
  }
}
