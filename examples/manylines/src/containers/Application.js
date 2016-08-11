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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

function Application(props) {
  const {
    quinoa: {
      actions: quinoaActions,
      store: {
        camera,
        currentGraph,
        currentSlide
      }
    },
    editorComponent
  } = props;

  return (
    <div id="wrapper">
      <div id="graph">
        <GraphLayout
          quinoaActions={quinoaActions}
          camera={camera}
          currentGraph={currentGraph}
          currentSlide={currentSlide} />
      </div>
      <div id="editor">
        {React.createElement(editorComponent)}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
