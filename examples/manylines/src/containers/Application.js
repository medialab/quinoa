/**
 * Quinoa Manylines Application Component
 * =======================================
 *
 * Root component of the application.
 */
import React from 'react';

export default function Application(props) {
  const {
    actions,
    editorComponent
  } = props;

  return (
    <div id="wrapper">
      Hello
      <div id="editor">
        {React.createElement(editorComponent)}
      </div>
    </div>
  );
}
