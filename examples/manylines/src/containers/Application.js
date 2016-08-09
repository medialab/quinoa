/**
 * Quinoa Manylines Application Component
 * =======================================
 *
 * Root component of the application.
 */
import React from 'react';
import GraphLayout from '../components/graph/GraphLayout';

export default function Application(props) {
  const {
    actions,
    camera,
    current,
    editorComponent
  } = props;

  return (
    <div id="wrapper">
      <div id="graph">
        <GraphLayout
          actions={actions}
          camera={camera}
          current={current} />
      </div>
      <div id="editor">
        {React.createElement(editorComponent)}
      </div>
    </div>
  );
}
