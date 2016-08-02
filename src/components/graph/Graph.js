/**
 * Quinoa Graph Component
 * =======================
 *
 * Component designed to handle the sigma graph.
 */
import React, {Component} from 'react';

/**
 * Constants.
 */
const SIGMA_SETTINGS = {
  labelThreshold: 7,
  minNodeSize: 2,
  edgeColor: 'default',
  defaultEdgeColor: '#D1D1D1'
};

const LAYOUT_SETTINGS = {
  strongGravityMode: true,
  gravity: 0.05,
  scalingRatio: 10,
  slowDown: 2
};

/**
 * Graph component.
 */
export default class Graph extends Component {
  componentDidMount() {

    // Initializing sigma's instance
    this.sigma = new sigma({
      container: this.container,
      settings: SIGMA_SETTINGS
    });

    sigma.parsers.gexf(
      this.props.data,
      this.sigma,
      () => this.sigma.refresh()
    );
  }

  render() {
    return (
      <div id="sigma-container" ref={div => this.container = div} />
    );
  }
}
