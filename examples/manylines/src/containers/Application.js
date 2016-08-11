/**
 * Quinoa Manylines Application Component
 * =======================================
 *
 * Root component of the application.
 */
import React from 'react';
import GraphLayout from '../components/graph/GraphLayout';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ACTIONS from '../actions';

const mapStateToProps = state => {
  const graph = state.graph;

  return {
    current: graph.current
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ACTIONS, dispatch)
  };
};

function Application(props) {
  const {
    quinoa: {
      actions: quinoaActions,
      store: {
        camera,
        current: currentSlide
      }
    },
    actions,
    current,
    editorComponent
  } = props;

  return (
    <div id="wrapper">
      <div id="graph">
        <GraphLayout
          quinoaActions={quinoaActions}
          actions={actions}
          camera={camera}
          currentGraph={current}
          currentSlide={currentSlide} />
      </div>
      <div id="editor">
        {React.createElement(editorComponent)}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
