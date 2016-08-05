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
  return {
    store: {
      text: state.editor.text
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
      <div id="graph">
        <GraphLayout />
      </div>
      <div id="wrapper">
        <div id="editor">
          <EditorLayout
            onChange={actions.updateEditor}
            text={store.text} />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
