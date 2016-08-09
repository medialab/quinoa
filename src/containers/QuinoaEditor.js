/**
 * Quinoa Editor container
 * ========================
 *
 * Simple component aiming at providing the editor's components with data
 * coming directely from the redux store.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QuinoaEditorLayout from '../components/QuinoaEditorLayout';
import * as actions from '../actions';

const mapStateToProps = state => {
  const editor = state.editor;

  return {
    store: {
      current: editor.current,
      currentSlide: editor.slides[editor.current],
      slides: editor.order.map(id => editor.slides[id])
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

function QuinoaEditor({actions, store}) {
  return (
    <div id="quinoa">
      <QuinoaEditorLayout
        current={store.current}
        slides={store.slides}
        actions={actions} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QuinoaEditor);
