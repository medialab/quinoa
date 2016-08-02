/**
 * Quinoa Graph Component
 * =======================
 *
 * Component designed to handle the sigma graph.
 */
import React, {Component} from 'react';
import GraphControls from './GraphControls';

/**
 * Constants.
 */
const SIGMA_SETTINGS = {
  labelThreshold: 7,
  minNodeSize: 2,
  edgeColor: 'default',
  defaultEdgeColor: '#D1D1D1',
  sideMargin: 20
};

const LAYOUT_SETTINGS = {
  strongGravityMode: true,
  gravity: 0.05,
  scalingRatio: 10,
  slowDown: 2
};

/**
 * Sigma instance.
 */
const sigInst = new sigma({
  settings: SIGMA_SETTINGS
});

const camera = sigInst.addCamera('main');

/**
 * Graph component.
 */
export default class Graph extends Component {
  componentDidMount() {

    // Adding the relevant renderer
    this.renderer = sigInst.addRenderer({
      camera: camera,
      container: this.container
    });

    // Loading the graph
    sigma.parsers.gexf(
      this.props.data,
      sigInst,
      () => sigInst.refresh()
    );
  }

  componentWillUnmount() {

    // Killing the renderer
    sigInst.killRenderer(this.renderer);
  }

  render() {
    return (
      <div>
        <GraphControls camera={camera} />
        <div id="sigma-container" ref={div => this.container = div} />
      </div>
    );
  }
}
