import React from "react";
import * as BABYLON from "babylonjs";
import * as PROCEDURAL from "babylonjs-procedural-textures";
import SceneCanvas from "./SceneCanvas";

import { bMap } from "../../libs/heightMap/randSimplexMap";

const PI = Math.PI;

class SceneView extends React.Component {

  onSceneMount = event => {
    const { canvas, scene, engine } = event;

    // This creates and positions a free camera (non-mesh)
    let camera = new BABYLON.ArcRotateCamera("camera1", 0, PI/4, 200, new BABYLON.Vector3(0, 0, 0), scene);

    // This targets the camera to scene origin
    // camera.setPosition(new BABYLON.Vector3(0, 0, 20));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    let light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-0.5, -1, -0.5), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.groundColor = new BABYLON.Color3(0, 0, 0);
    light.position = new BABYLON.Vector3(0, 0, 200);
    // light.intensity = 0.5;

    //Applying some shadows
    let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    // let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    let ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 32, scene, true);
    let map = bMap(0.05, 128, 128);
    ground.applyDisplacementMapFromBuffer(map, 128, 128, -5, 5);

    let groundMat = new BABYLON.StandardMaterial("ground-mat", scene);
    let groundDiff = new PROCEDURAL.GrassProceduralTexture("grass", 256, scene);
    let groundSpec = new BABYLON.NoiseProceduralTexture("grassSpec", 256, scene);
    groundSpec.octaves = 8;
    groundSpec.persistence = 0.8;
    groundSpec.animationSpeedFactor = 0;
    groundMat.diffuseTexture = groundDiff;
    groundMat.specularTexture = groundSpec;
    ground.material = groundMat;
    shadowGenerator.getShadowMap().renderList.push(ground);
    ground.receiveShadows = true;

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

export default SceneView;
