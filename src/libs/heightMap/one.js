
import oSimplex from "../noise/open_simplex";
const oplex = new oSimplex();
oplex.seed();
oplex.setup2D();
// import cPerlin from "../noise/cperlin";
// const cper = new cPerlin();
// cper.noiseSeed(11);

export const randMap = (scaleFac, width, height) => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  let imgData = ctx.getImageData(0, 0, width, height);
  let data = imgData.data;

  // for (let i = 0, k = data.length; i < k; i+=4) {
  //   data[i] = 255;
  //   data[i+3] = 255;
  // }

  let pos, noisyBit;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      pos = (y * width + x) * 4;
      noisyBit = Math.floor(256 * (oplex.noise2D(x*scaleFac, y*scaleFac) + 0.864) / 1.728);
      // noisyBit = Math.floor(255 * cper.noise(x, y))
      data[pos] = noisyBit;
      data[pos + 1] = noisyBit;
      data[pos + 2] = noisyBit;
      data[pos + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  let image = new Image(width, height);

  image.src = canvas.toDataURL();

  return image;
}

export const randMap2 = (scaleFac, width, height) => {

  let buffer = new Uint8ClampedArray(width * height * 4);

  let pos, noisyBit;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      pos = (y * width + x) * 4;
      noisyBit = 256 * (oplex.noise2D(y * scaleFac, x * scaleFac) + 0.864) / 1.728;
      buffer[pos] = noisyBit;
      buffer[pos + 1] = noisyBit;
      buffer[pos + 2] = noisyBit;
      buffer[pos + 3] = 255;
    }
  }

  return buffer;
}