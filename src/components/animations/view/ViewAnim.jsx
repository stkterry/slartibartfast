import React from "react";

import ViewCanvas from "./ViewCanvas";

class ViewAnim extends React.Component {

  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnim = this.updateAnim.bind(this);
  }

  componentDidMount() {
    this.ctx = document.getElementById("view-pure-canvas");
    this.width = this.ctx.width;
    this.height = this.ctx.height;
    this.rAF = requestAnimationFrame(this.updateAnim);
  }

  updateAnim() {
    this.setState(prevState =>
      ({ angle: prevState.angle + 1 })
    );
    this.rAF = requestAnimationFrame(this.updateAnim);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return (
      <ViewCanvas angle={this.state.angle} />
    )
  }
}

export default ViewAnim;