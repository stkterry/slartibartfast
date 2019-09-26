
import oSimplex from "../noise/open_simplex";
import cPerlin from "../noise/cperlin";
const oplex = new oSimplex();
oplex.seed(11);
oplex.setup2D();

const cper = new cPerlin();
cper.noiseSeed(11);
cper.noiseDetail(8, 0.5);

export const iMap = (scaleFac, width, height) => {
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

export const bMap = (scaleFac, width, height) => {
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

export const bPerlinMap = (scaleFac, width, height) => {
  let buffer = new Uint8ClampedArray(width * height * 4);
  let fac = Math.sqrt(0.5);
  let fac2 = fac*2;
  let pos, noisyBit;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      pos = (y * width + x) * 4;
      noisyBit = 256 * cper.noise(1 + y * scaleFac, 1 + x * scaleFac) ;
      // console.log(noisyBit)
      buffer[pos] = noisyBit;
      buffer[pos + 1] = noisyBit;
      buffer[pos + 2] = noisyBit;
      buffer[pos + 3] = 255;
    }
  }

  return buffer;
}