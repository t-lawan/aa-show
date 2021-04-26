import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Colours } from "../Global/global.styles";
import RequestManager from "../../Utility/Managers/RequestManager";
const style = {
  height: "100vh" // we can control scene size by setting container dimensions
};

class BedfordSquare extends Component {
    clickableObjects = [];
  async componentDidMount() {
    this.init();
    this.addGrid();
    await this.initLoadingObjects();
    console.log('ADD', this.clickableObjects.length)
    this.addEventListener()
    this.startAnimationLoop();
  }

  componentWillUnmount() {
      this.removeEventListener()
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  init = () => {
    this.setupScene();
    this.setupCamera();
    this.setupControls();
    this.setupMouse();
    this.setupRayCaster();
    this.setupRenderer();
  }

  initLoadingObjects = async () => {
      let projects = await RequestManager.getProjects();
      console.log('PROJECTS', projects)
      projects.forEach((project) => {
        this.addCube(project);
      })
  }

  setupScene = () => {
    this.scene = new THREE.Scene();
  }

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
        75, // fov = field of view
        this.mount.clientWidth / this.mount.clientHeight, // aspect ratio
        0.1, // near plane
        1000 // far plane
      );
      this.camera.position.z = 50; 
      this.camera.position.y = 40; 
  }

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.mount);
  }

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(Colours.yellow);

    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  }

  setupRayCaster = () => {
    this.raycaster = new THREE.Raycaster();
  };

  setupLoadingManager = () => {
    this.manager = new THREE.LoadingManager(
      this.hasLoaded,
      this.loadProgressing
    );
  };

  setupMouse = () => {
    this.mouse = new THREE.Vector2();
  };

  setMouse = event => {
    this.mouse.x = (event.clientX / this.mount.clientWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.mount.clientHeight) * 2 + 1;
  };

  hasLoaded = () => {
 
  };

  loadProgressing = (url, itemsLoaded, itemsTotal) => {
  };
  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry

  addGrid = () => {
    const size = 50;
    const divisions = 50;

    const gridHelper = new THREE.GridHelper(size, divisions);

    const axesHelper = new THREE.AxesHelper( 5 );
    this.scene.add( axesHelper );
    this.scene.add(gridHelper);
  };

  addCube = (project) => {
    const coordinate = project.coordinate;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial( {
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true
    } );
    
    this.cube = new THREE.Mesh( geometry, material );
    this.cube.position.set(coordinate.x, coordinate.y, coordinate.z);
    this.scene.add( this.cube );
    this.cube.userData.isClickable = true;
    this.cube.userData.project = project;
    this.clickableObjects.push(this.cube);


    const lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    this.scene.add( lights[ 0 ] );
    this.scene.add( lights[ 1 ] );
    this.scene.add( lights[ 2 ] );
  }

  startAnimationLoop = () => {
    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  addEventListener = () => {
    window.addEventListener("resize", this.onWindowResize);
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);

  }

  removeEventListener = () => {
    window.removeEventListener("resize", this.onWindowResize);
    document.removeEventListener("mousemove", this.onDocumentMouseMove);

  }

  onWindowResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  onDocumentMouseMove = (event) => {
    event.preventDefault();
    this.setMouse(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.clickableObjects, true);
    if(this.intersects.length > 0) {
        let obj = this.intersects[0].object;
        obj.material.color.r = 0;
        obj.material.color.g = 255;
        obj.material.color.b = 0;
        console.log('OBJECT', obj);
    }
    // let boundingBoxes = this.clickableObjects.map(object => {
    //     return object.objectBoundary;
    // })

  }

  render() {
    return <div style={style} ref={ref => (this.mount = ref)} />;
  }
}

export default BedfordSquare;
