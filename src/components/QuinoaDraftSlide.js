/**
 * Quinoa Draft Slide Component
 * =============================
 *
 * Component rendering the Draft.js editor for a single slide.
 */
import React, {Component} from 'react';
import {Editor, RichUtils} from 'draft-js';

import QuinoaSlideTitle from './QuinoaSlideTitle';

export default class QuinoaDraftSlide extends Component {
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.props.slide.draft, command);

    if (newState) {
      this.props.update(this.props.slide.id, {draft: newState});
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    const {
      slide,
      update
    } = this.props;

    // TODO: apply best practices to handler below
    return (
      <div>
        <div className="quinoa-slide-title">
          <QuinoaSlideTitle value={slide.title} onChange={e => update(slide.id, {title: e.target.value})} />
        </div>
        <Editor
          editorState={slide.draft}
          onChange={state => update(slide.id, {draft: state})}
          handleKeyCommand={this.handleKeyCommand.bind(this)} />
      </div>
    );
  }
}
