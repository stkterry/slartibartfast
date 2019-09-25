import React from "react";
import * as BABYLON from "babylonjs";
import SceneCanvas from "./SceneCanvas";

import { randMap, randMap2 } from "../../libs/heightMap/one";

const PI = Math.PI;

class ViewScene extends React.Component {

  onSceneMount = event => {
    const { canvas, scene, engine } = event;

    // This creates and positions a free camera (non-mesh)
    let camera = new BABYLON.ArcRotateCamera("camera1", 0, PI/4, 200, new BABYLON.Vector3(0, 0, 0), scene);

    // This targets the camera to scene origin
    // camera.setPosition(new BABYLON.Vector3(0, 0, 20));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 100, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.5;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    // let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    let ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 32, scene, true);
    let map = randMap2(0.05, 100, 100);
    ground.applyDisplacementMapFromBuffer(map, 100, 100, -10, 10);

    // let dynTex = new BABYLON.DynamicTexture("color", 400, scene, true);
    // let dynTexCtx = dynTex.getContext();
    // let imageData = dynTexCtx.getImageData(0, 0, 400, 400);
    // imageData.data.set(map);
    // dynTexCtx.putImageData(imageData, 0, 0);
    // dynTex.update();
    // let mat = new BABYLON.StandardMaterial("mat", scene);
    // mat.diffuseTexture = dynTex;

    let material = new BABYLON.StandardMaterial("ground-mat", scene);
    material.wireframe = true;
    ground.material = material; 

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  }

  render() {
    return (
      <SceneCanvas 
        onSceneMount={this.onSceneMount} 
        width="500px" 
        height="500px"
      />
    )
  }
}

export default ViewScene;

// var dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true); 
// var textureContext = dynamicTexture.getContext();
// textureContext is a Canvas2DContext which is a really powerful tool to use 2D API
// For instance we can use the getImageData, putImagedata to paste arraybuffervar 
// imageData = textureContext.getImageData(0, 0, 512, 512);
// var buf8 = new Uint8ClampedArray(data);
// imageData.data.set(buf8);
// textureContext.putImageData(imageData, 0, 0);
// dynamicTexture.update();
