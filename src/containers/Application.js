/**
 * Quinoa Application Container
 * =============================
 *
 * Simple component sketching the app's HTML structure.
 */
import React from 'react';
import Editor from '../components/Editor';

export default function Application() {
  return (
    <div>
      <div id="editor-wrapper">
        <div id="editor">
          <Editor />
        </div>
      </div>
    </div>
  );
}
