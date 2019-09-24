import React from "react";
import * as BABYLON from "babylonjs";
import SceneCanvas from "./SceneCanvas";

const PI = Math.PI;

class ViewScene extends React.Component {

  onSceneMount = event => {
    const { canvas, scene, engine } = event;

    // This creates and positions a free camera (non-mesh)
    let camera = new BABYLON.ArcRotateCamera("camera1", PI/4, PI/3, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // This targets the camera to scene origin
    // camera.setPosition(new BABYLON.Vector3(0, 0, 20));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    let ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

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