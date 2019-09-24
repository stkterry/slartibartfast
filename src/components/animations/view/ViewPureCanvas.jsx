import React from "react";

class ViewPureCanvas extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const ref = node => node ? this.props.ctxRef(node.getContext('webgl')) : null
    if (!ref) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
    return (
      <canvas
        width="640"
        height="480"
        id="view-pure-canvas"
        className="canvas"
        ref={ref}
      />
    )
  }

}

export default ViewPureCanvas;