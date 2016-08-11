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

const fetcherReducer = string => {
  const parser = new DOMParser();
  return parser.parseFromString(string, 'application/xml');
};

export default function GraphLayout(props) {
  const {
    actions,
    quinoaActions,
    camera,
    currentGraph,
    currentSlide,
  } = props;

  const params = {
    url: `./resources/${currentGraph}.gexf`,
    dataType: 'xml'
  };

  return (
    <Fetcher params={params} reducer={fetcherReducer} >
      <Graph
        camera={camera}
        currentGraph={currentGraph}
        currentSlide={currentSlide}
        selectGraph={actions.selectGraph}
        updateSlide={quinoaActions.updateSlide} />
    </Fetcher>
  );
}
