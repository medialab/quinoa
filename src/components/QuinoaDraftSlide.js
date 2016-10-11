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

  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

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

    const onEditorChange = state => update(slide.id, {draft: state});
    const onTitleChange = e => update(slide.id, {title: e.target.value});

    // TODO: apply best practices to handler below
    return (
      <div>
        <div className="quinoa-slide-title">
          <QuinoaSlideTitle value={slide.title} onChange={onTitleChange} />
        </div>
        <Editor
          editorState={slide.draft}
          onChange={onEditorChange}
          handleKeyCommand={this.handleKeyCommand} />
      </div>
    );
  }
}
