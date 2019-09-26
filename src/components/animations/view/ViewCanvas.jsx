import React from "react";

import ViewPureCanvas from "./ViewPureCanvas";
import { iMap } from "../../../libs/heightMap/randSimplexMap";

class ViewCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveCTX = this.saveCTX.bind(this);
  }

  componentDidMount() {
    this.image = iMap(0.01, 400, 400);
  }

  componentWillUnmount() {
  }
  
  saveCTX(ctx) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }
  
  componentDidUpdate() {
    this.ctx.save();
    this.draw();
    this.ctx.restore();
  }

  draw() {
    this.ctx.filStyle="black";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.image, 10, 10);
  }

  render() {
    return <ViewPureCanvas ctxRef={this.saveCTX} />;
  }
}

export default ViewCanvas;