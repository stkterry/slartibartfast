import React from "react";
import * as BABYLON from "babylonjs";
import * as PROCEDURAL from "babylonjs-procedural-textures";
import * as MATERIALS from "babylonjs-materials";
import SceneCanvas from "./SceneCanvas";

import { bMap, bPerlinMap } from "../../libs/heightMap/randSimplexMap";

// import tex from "../../assets/public/textures/waterbump.jpg"

const PI = Math.PI;

class SceneView extends React.Component {

  onSceneMount = event => {
    const { canvas, scene, engine } = event;

    // This creates and positions a free camera (non-mesh)
    let camera = new BABYLON.ArcRotateCamera("camera1", 0, PI/4, 500, new BABYLON.Vector3(0, 0, 0), scene);

    // This targets the camera to scene origin
    // camera.setPosition(new BABYLON.Vector3(0, 0, 20));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    let light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-0.5, -1, -0.5), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.groundColor = new BABYLON.Color3(0, 0, 0);
    light.position = new BABYLON.Vector3(0, 0, 2000);
    // light.intensity = 0.5;

    //Applying some shadows
    // let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    // let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    let ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 64, scene, true);
    let map = bPerlinMap(0.01, 256, 256);
    let groundVertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
      width: 1000,
      height: 1000,
      subdivisions: 100, 
      minHeight: -250,
      maxHeight: 250,
      buffer: map,
      bufferWidth: 256,
      bufferHeight: 256
    });
    groundVertexData.applyToMesh(ground, true);

    let groundMat = new BABYLON.StandardMaterial("ground-mat", scene);
    let groundDiff = new PROCEDURAL.GrassProceduralTexture("grass", 256, scene);
    let groundSpec = new BABYLON.NoiseProceduralTexture("grassSpec", 256, scene);
    groundSpec.octaves = 8;
    groundSpec.persistence = 0.8;
    groundSpec.animationSpeedFactor = 0;
    groundMat.diffuseTexture = groundDiff;
    groundMat.specularTexture = groundSpec;
    ground.material = groundMat;
    // ground.material.backFaceCulling = false;
    // shadowGenerator.getShadowMap().renderList.push(ground);
    // ground.receiveShadows = true;

    // Water Plane
    let water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 64, scene);
    let waterMat = new MATERIALS.WaterMaterial("water-mat", scene);
    waterMat.bumpTexture = new BABYLON.Texture("assets/textures/waterbump.jpg", scene)
    // waterMat.bumpTexture = new BABYLON.NoiseProceduralTexture("waterBump", 1024, scene);
    // Water properties
    // waterMat.windForce = -15;
    // waterMat.waveHeight = 1.3;
    // waterMat.windDirection = new BABYLON.Vector2(1, 1);
    waterMat.waterColor = new BABYLON.Color3(0.1, 0.3, 0.6);
    waterMat.colorBlendFactor = 0.5;
    waterMat.bumpHeight = 0.05;
    // waterMat.waveLength = 0.1

    waterMat.addToRenderList(ground)
    water.material = waterMat;

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
