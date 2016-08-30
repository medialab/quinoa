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

  return (
    <div id="quinoa-draft">
      <QuinoaDraftSlide
        id={store.slides[0].id}
        draft={store.slides[0].draft}
        update={actions.updateSlide} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QuinoaDraft);
