import React from "react";

import ViewPureCanvas from "./ViewPureCanvas";
import { randMap } from "../../../libs/heightMap/one";

class ViewCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveCTX = this.saveCTX.bind(this);
  }

  componentDidMount() {
    this.image = randMap(0.01, 400, 400);
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
    // const { angle } = this.props;
    // // this.ctx.save();
    // this.ctx.beginPath();
    // this.ctx.clearRect(0, 0, this.width, this.height);
    // this.ctx.translate(this.width / 2, this.height / 2);
    // this.ctx.rotate((angle * Math.PI) / 180);
    // this.ctx.fillStyle = '#4397AC';
    // this.ctx.fillRect(
    //   -this.width / 4,
    //   -this.height / 4,
    //   this.width / 2,
    //   this.height / 2
    // );
    // this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);
    // this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
  }

  render() {
    return <ViewPureCanvas ctxRef={this.saveCTX} />;
  }
}

export default ViewCanvas;