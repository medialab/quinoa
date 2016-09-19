/**
 * Quinoa Draft container
 * =======================
 *
 * Simple component aiming at providing the draft's components with data
 * coming directely from the redux store.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QuinoaDraftSlide from '../components/QuinoaDraftSlide';
import {slidesFromEditorState} from '../state';
import * as ACTIONS from '../actions';

const mapStateToProps = state => {
  const editor = state.editor;

  return {
    store: {
      currentSlide: editor.slides[editor.current],
      slides: slidesFromEditorState(editor)
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ACTIONS, dispatch)
  };
};

function QuinoaDraft({actions, store}) {
  const currentSlide = store.currentSlide;

  return (
    <div className="quinoa-draft">
      <QuinoaDraftSlide
        id={currentSlide.id}
        slide={currentSlide}
        draft={currentSlide.draft}
        update={actions.updateSlide} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QuinoaDraft);
