/**
 * Quinoa Graph Component
 * =======================
 *
 * Component designed to handle the sigma graph.
 */
import React, {Component} from 'react';
import GraphControls from './GraphControls';
import debounce from 'lodash/debounce';

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

/**
 * Sigma instance.
 */
const sigInst = new sigma({
  settings: SIGMA_SETTINGS
});

const camera = sigInst.addCamera('main');

/**
 * Helpers.
 */

// NOTE: I should probably rely on the camera's internal event instead
function monkeyPatchCamera(action) {
  const originalFn = camera.goTo;
  camera.goTo = function() {
    if (typeof action === 'function')
      action();
    return originalFn.apply(camera, arguments);
  };

  return () => {
    camera.goTo = originalFn;
  };
}

/**
 * Graph component.
 */
export default class Graph extends Component {
  constructor(props, context) {
    super(props, context);

    // Building the action
    this.updateSlide = () => {
      this.props.update(this.props.current, {meta: {camera: sigInst.saveCamera('main')}});
    };

    this.updateSlide = debounce(this.updateSlide, 100);
  }

  componentDidMount() {

    // Adding the relevant renderer
    this.renderer = sigInst.addRenderer({
      container: this.container,
      camera
    });

    // Loading the graph
    sigma.parsers.gexf(
      this.props.data,
      sigInst,
      () => sigInst.refresh()
    );

    // Hooking into the camera
    this.releaseCamera = monkeyPatchCamera(this.updateSlide);
  }

  componentDidUpdate(prev) {

    // If the slide has changed, we try to apply the saved camera
    if (prev.current !== this.props.current)
      sigInst.loadCamera('main', this.props.camera);
  }

  componentWillUnmount() {

    // Killing the renderer
    sigInst.killRenderer(this.renderer);

    // Releasing the camera
    this.releaseCamera();
  }

  render() {
    return (
      <div>
        <GraphControls camera={camera} />
        <div id="sigma-container" ref={div => (this.container = div)} />
      </div>
    );
  }
}
