import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Colours } from "../Global/global.styles";
import RequestManager from "../../Utility/Managers/RequestManager";
import { GLTFLoader } from "../../Utility/Loaders/GLTFLoader.js";
import Bucket from '../../Assets/Models/Bucket/scene.gltf'
import Bear from '../../Assets/Models/Bear.glb'
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
    this.setupLoadingManager();
    this.addEventListener();
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
      projects.forEach((project) => {
        this.addCube(project);
        this.addObject(project, Bear);
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
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = this.loadStart;
    this.manager.onProgress = this.loadProgressing;
    this.manager.onLoad = this.loadFinished;
    this.manager.onError = this.loadError;
  };

  setupMouse = () => {
    this.mouse = new THREE.Vector2();
  };

  setMouse = event => {
    this.mouse.x = (event.clientX / this.mount.clientWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.mount.clientHeight) * 2 + 1;
  };

  loadStart = (url, itemsLoaded, itemsTotal) => {
  };

  loadProgressing = (url, itemsLoaded, itemsTotal) => {
  };

  loadFinished = () => {
    console.log('FINISHED')
  };

  loadError = (url) => {
    console.log('ERROR', url)

  }

  hasLoaded = () => {
 
  };

  loadProgressing = (url, itemsLoaded, itemsTotal) => {
  };
  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry

  addGrid = () => {
    const size = 100;
    const divisions = 100;

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

    // this.scene.add( lights[ 0 ] );
    this.scene.add( lights[ 1 ] );
    // this.scene.add( lights[ 2 ] );
  }

  addObject = (project, object = Bear) => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();
    const coordinate = project.coordinate;


    loader.load(object, gltf => {
        mesh = gltf.scene;
        mesh.userData.project = project;
        mesh.position.x = coordinate.x;
        mesh.position.y = coordinate.y;
        mesh.position.z = coordinate.z;
        this.scene.add(mesh);
        this.clickableObjects.push(mesh);

    })
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
    document.addEventListener("dblclick", this.onDoubleClick, false);

  }

  removeEventListener = () => {
    window.removeEventListener("resize", this.onWindowResize);
    document.removeEventListener("mousemove", this.onDocumentMouseMove);
    document.removeEventListener("dblclick", this.onDoubleClick);

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
    }
    // let boundingBoxes = this.clickableObjects.map(object => {
    //     return object.objectBoundary;
    // })

  }

  onDoubleClick = event => {
      this.setMouse(event);
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.intersects = this.raycaster.intersectObjects(this.clickableObjects, true);
      if (this.intersects.length > 0) {
        let mesh = this.intersects[0];
      }
      
  };

  render() {
    return <div style={style} ref={ref => (this.mount = ref)} />;
  }
}

export default BedfordSquare;
