/**
 * Quinoa Application Container
 * =============================
 *
 * Simple component sketching the app's HTML structure.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import EditorLayout from '../components/editor/EditorLayout';
import GraphLayout from '../components/graph/GraphLayout';
import * as ACTIONS from '../actions';

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
    actions: bindActionCreators(ACTIONS, dispatch)
  };
};

function Application({actions, store}) {
  return (
    <div>
      <div id="wrapper">
        <div id="graph">
          <GraphLayout
            current={store.current}
            camera={store.currentSlide.meta.camera}
            actions={actions} />
        </div>
        <div id="editor">
          <EditorLayout
            current={store.current}
            slides={store.slides}
            actions={actions} />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
