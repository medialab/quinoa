/**
 * Graph Layout Component
 * =======================
 *
 * Component responsible for rendering the layout holding the graph handled
 * by Quinoa editor.
 */
import React from 'react';
import Fetcher from '@yomguithereal/react-utilities/Fetcher';
import Graph from './Graph';

const fetcherParams = {
  url: './resources/graph.gexf',
  dataType: 'xml'
};

const fetcherReducer = string => {
  const parser = new DOMParser();
  return parser.parseFromString(string, 'application/xml');
};

export default function GraphLayout(props) {
  const {
    actions,
    camera,
    current,
  } = props;

  return (
    <Fetcher params={fetcherParams} reducer={fetcherReducer} >
      <Graph
        camera={camera}
        current={current}
        update={actions.updateSlide} />
    </Fetcher>
  );
}
