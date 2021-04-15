import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Colours } from "../Global/global.styles";
import * as THREEx from "../../Utility/AR";
const style = {
  height: "100vh" // we can control scene size by setting container dimensions
};

class AREnvironment extends Component {
  onRenderFunctions = [];
  componentDidMount() {
    this.init();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  init = () => {
    this.setupScene();
    this.addTorusKnot();
    this.addLights();
  };

  setupArToolkitSource = () => {
    this.arToolkitSource = new THREEx.ArToolkitSource({
      // to read from the webcam
      sourceType: "webcam"

      // // to read from an image
      // sourceType : 'image',
      // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',

      // to read from a video
      // sourceType : 'video',
      // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',
    });

    this.arToolkitSource.init(() => {
      setTimeout(() => {
        this.handleWindowResize();
      }, 2000);
    });
  };

  setupArToolkitContext = () => {
    // create atToolkitContext
    this.arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl:
        THREEx.ArToolkitContext.baseURL + "../data/data/camera_para.dat",
      detectionMode: "mono"
    });
    // initialize it
    this.arToolkitContext.init(function onCompleted() {
      // copy projection matrix to camera
      this.camera.projectionMatrix.copy(
        this.arToolkitContext.getProjectionMatrix()
      );
    });

    this.onRenderFunctions.push(() => {
      if (this.arToolkitSource.ready === false) return;

      this.arToolkitContext.update(this.arToolkitSource.domElement);

      this.scene.visible = this.camera.visible;
    });
  };

  createArMarkerControls = () => {
    let markerControls = new THREEx.ArMarkerControls(
      this.arToolkitContext,
      this.camera,
      {
        type: "pattern",
        patternUrl: THREEx.ArToolkitContext.baseURL + "../data/data/patt.hiro",
        // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
        // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
        changeMatrixMode: "cameraTransformMatrix"
      }
    );
    // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
    scene.visible = false;
  };

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  setupScene = () => {
    // get container dimensions and use them for scene sizing
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.mount);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(Colours.yellow);

    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

  addTorusKnot = () => {
    let geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
    let material = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    this.onRenderFunctions.push(delta => {
      mesh.rotation.x += Math.PI * delta;
    });
  };

  addLights = () => {
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
    lastTimeMsec = nowMsec;

    this.onRenderFunctions.forEach(renderFunction => {
      renderFunction(deltaMsec / 1000, nowMsec / 1000);
    });
    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();

    if (this.this.arToolkitSource) {
      this.arToolkitSource.onResizeElement();
      this.arToolkitSource.copyElementSizeTo(renderer.domElement);
      if (this.arToolkitContext.arController !== null) {
        this.arToolkitSource.copyElementSizeTo(
          this.arToolkitContext.arController.canvas
        );
      }
    }
  };

  render() {
    return <div style={style} ref={ref => (this.mount = ref)} />;
  }
}

export default AREnvironment;
