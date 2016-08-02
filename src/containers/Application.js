/**
 * Quinoa Application Container
 * =============================
 *
 * Simple component sketching the app's HTML structure.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import GraphLayout from '../components/graph/GraphLayout';
import * as actions from '../actions';

const mapStateToProps = state => {
  return {
    store: {
      draft: state.editor.draft,
      markdown: state.editor.draft.getCurrentContent().getPlainText()
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
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
          <Editor onChange={actions.updateEditor}
                  editorState={store.draft} />
        </div>
        {false && <div id="preview">
          <Preview markdown={store.markdown} />
        </div>}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
