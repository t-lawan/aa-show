import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Colours } from "../Global/global.styles";
import RequestManager from "../../Utility/Managers/RequestManager";
import { GLTFLoader } from "../../Utility/Loaders/GLTFLoader.js";
import Astronaut from "../../Assets/Models/Astronaut.glb";
import LoadingPage from "../Loading/LoadingPage/LoadingPage";
import Overlay from "../Overlay/Overlay";
import { setSelectedArProject } from "../../Store/action";
import { connect } from "react-redux";

import ContextModel from '../../Assets/Models/Context.glb';
import AAWingModel from '../../Assets/Models/AAWing.glb';
import EastSideModel from '../../Assets/Models/EastSide.glb';
import NorthSideModel from '../../Assets/Models/NorthSide.glb';
import SouthSideModel from '../../Assets/Models/SouthSide.glb';
import RoadOutlineModel from '../../Assets/Models/RoadOutline.glb';
import Sidebar from "../Sidebar/Sidebar";
import ARModal from "../ARModal/ARModal";
import RightSidebar from "../Sidebar/RightSidebar";
import Navbar from "../Navbar/Navbar";

const BedfordSquareWrapper = styled.div`
  height: 100vh;
  display: ${props => (props.show ? "block" : "none")};
`;

const ARButtonWrapper = styled.div`
  display: ${props => props => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 0;
  width: 20vw;
  height: 5vw;
  left: 40vw;
  background: red;
`;

class BedfordSquare extends Component {
  clickableObjects = [];
  baseColor = new THREE.Color(0,0,0);
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      itemsLoaded: 0,
      itemsTotal: 0,
      showOverlay: false,
      showSidebar: true,
      projects: [],
      pageInfo : null
    };
  }
  async componentDidMount() {
    this.init();
    // this.addGrid();
    this.addEnvironment();
    await this.initLoadingObjects();
    this.setupLoadingManager();
    this.addEventListener();
    this.startAnimationLoop();
  }

  componentWillUnmount() {
    this.removeEventListener();
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  init = () => {
    this.setupScene();
    this.setupCamera();
    this.setupControls();
    this.setupLoadingManager();
    this.addLights();
    this.setupMouse();
    this.setupRayCaster();
    this.setupRenderer();
  };

  initLoadingObjects = async () => {
    let pageInfo = await RequestManager.getPageInfo()
    let projects = await RequestManager.getProjects();
    console.log('pro', projects)
    projects.forEach(project => {
      // this.addCube(project);
      if(project.shouldDisplay){
        this.addObject(project, project.modelUrl);
      }
    });
    // console.log('PROJECTS', projects);
    this.setState({
      projects: projects,
      pageInfo: pageInfo
    })
  };

  setupScene = () => {
    this.scene = new THREE.Scene();
  };

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      this.mount.clientWidth / this.mount.clientHeight, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    
    // this.camera.position.set(300,300,1000);
    this.camera.position.y = 40;
    this.camera.position.z = 40;
  };

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.mount);
  };

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({antialias: true, premultipliedAlpha:true});
    // this.renderer.setClearColor(Colours.background);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor("#c9c9c9");
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 8;

    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

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
    this.setState({
      itemsLoaded: itemsLoaded,
      itemsTotal: itemsTotal
    });
  };

  loadProgressing = (url, itemsLoaded, itemsTotal) => {
    this.setState({
      itemsLoaded: itemsLoaded,
      itemsTotal: itemsTotal
    });
  };

  loadFinished = () => {
    this.setState({
      hasLoaded: true
    });
    console.log('HAS LOADED')
    this.onWindowResize();
  };

  loadError = url => {
    console.log("ERROR", url);
  };

  hasLoaded = () => {};

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry

  addGrid = () => {
    const size = 200;
    const divisions = 200;

    const gridHelper = new THREE.GridHelper(size, divisions);

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
    this.scene.add(gridHelper);
  };

  addEnvironment = () => {
    this.addEnvironmentObject(ContextModel, 'CONTEXT');
    this.addEnvironmentObject(AAWingModel, 'AAWING');
    this.addEnvironmentObject(RoadOutlineModel, 'RoadOutline');
    this.addEnvironmentObject(NorthSideModel, 'NorthSide');
    this.addEnvironmentObject(SouthSideModel, 'SouthSide');

  }

  addLights = () => {
    let hemilight = new THREE.HemisphereLight(0xfff0db, 0xfff0db, 0);
    this.scene.add(hemilight);

    let light = new THREE.AmbientLight(0xfff0db, 1);
    this.scene.add(light);

    let light3 = new THREE.DirectionalLight(0xfff0db, 2);
    light3.position.z = 50;
    light3.position.x = 200;
    light3.position.y = 500;

    light3.castShadow = true;
    light3.shadow.mapSize.width = 2048;
    light3.shadow.mapSize.height = 2048;
    light3.shadow.camera.near = 0.1;
    light3.shadow.camera.far = 1000;
    light3.shadow.intensity = 1000;
    this.scene.add(light3);
  };

  addCube = project => {
    const coordinate = project.coordinate;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(coordinate.x, coordinate.y, coordinate.z);
    this.scene.add(this.cube);
    this.cube.userData.isClickable = true;
    this.cube.userData.project = project;
    this.clickableObjects.push(this.cube);
  };

  addEnvironmentObject = (object, name) => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();

    loader.load(object, gltf => {
      mesh = gltf.scene;
      mesh.name = name;
      mesh.position.z = 0;
      // mesh.position.y = -25;
      this.scene.add(mesh);
    })
  }

  addObject = (project, object = Astronaut) => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();
    const coordinate = project.coordinate;

    loader.load(object, gltf => {
      mesh = gltf.scene;
      mesh.userData.project = project;
      mesh.position.x = coordinate.x;
      mesh.position.y = coordinate.y;
      // mesh.position.y = 0;
      mesh.position.z = coordinate.z;
      mesh.visible = true
      mesh.children[0].userData.project = project;
      this.baseColor = mesh.children[0].material.color;
      mesh.userData.baseColor = mesh.children[0].material.color;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      // console.log('ADD MESH', mesh)
      this.scene.add(mesh);
      this.clickableObjects.push(mesh);
    });
  };

  findMeshFromProject = (project) => {
    let mesh =this.clickableObjects.find((pr) => {
      return pr.userData.project.title == project.title;
    })

    return mesh;
  }

  startAnimationLoop = () => {
    this.clickableObjects.forEach((mesh)=> {
      if(mesh.userData.project && mesh.userData.project.rotation){
        mesh.rotation.x += mesh.userData.project.rotation.x;
        mesh.rotation.y += mesh.userData.project.rotation.y;
        mesh.rotation.z += mesh.userData.project.rotation.z;

      }
    })
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
  };

  removeEventListener = () => {
    window.removeEventListener("resize", this.onWindowResize);
    document.removeEventListener("mousemove", this.onDocumentMouseMove);
    document.removeEventListener("dblclick", this.onDoubleClick);
  };

  onWindowResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  onDocumentMouseMove = event => {
    // event.preventDefault();
    // this.setMouse(event);
    // this.raycaster.setFromCamera(this.mouse, this.camera);
    // this.intersects = this.raycaster.intersectObjects(this.clickableObjects, true);
    // if(this.intersects.length > 0) {
    //     let obj = this.intersects[0].object;
    //     obj.material.color.r = 0;
    //     obj.material.color.g = 255;
    //     obj.material.color.b = 0;
    // }
    // let boundingBoxes = this.clickableObjects.map(object => {
    //     return object.objectBoundary;
    // })
  };

  onDoubleClick = event => {
    event.preventDefault();
    this.setMouse(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(
      this.clickableObjects,
      true
    );
    if (this.intersects.length > 0) {
      let mesh = this.intersects[0];
      let obj = this.intersects[0].object;
      // obj.material.color.r = 116;
      // obj.material.color.g = 251;
      // obj.material.color.b = 253;
      obj.material.color = new THREE.Color( 0x87ffd7)
      // console.log('OBJ', obj)
      let project = obj.parent.userData.project;
      if (project) {
        console.log(project)
        this.props.setSelectedArProject(project);
        this.setState({
          showOverlay: true
        });
      }
    }
  };

  hideOverlay = () => {
    this.setState({
      showOverlay: false
    });
  };

  selectProject = (project) => {

    this.highlightProject(project);
    // Move towards totem
    let mesh = this.findMeshFromProject(project);
    console.log('MESH', mesh)
    this.controls.target = mesh.position;
    this.controls.update()
    this.props.setSelectedArProject(project);
    this.setState({
      showOverlay: true
    });

  }

  highlightProject = (project) => {
    if(project.shouldDisplay) {
      let mesh = this.findMeshFromProject(project)
      // mesh.children[0].material.color = new THREE.Color( 0x87ffd7);
      mesh.traverse((child) => {
        if(child.material){
          child.material.color = new THREE.Color( 0x87ffd7)

        }
      })
      setTimeout(() => {
        mesh.traverse((child) => {
          if(child.material){
            child.material.color = mesh.userData.baseColor;

          }
        })
        // mesh.children[0].material.color = new THREE.Color(255,255,255);
      }, 3000)

      // console.log('highlightProject', mesh)

    }
  }

  render() {
    return (
      <>
        <BedfordSquareWrapper
          show={this.state.hasLoaded}
          ref={ref => (this.mount = ref)}
        />
        <Overlay
          onClick={() => this.hideOverlay()}
          show={this.state.showOverlay}
        />
        <Sidebar show={this.state.hasLoaded} projects={this.state.projects} pageInfo={this.state.pageInfo} onClick={this.selectProject.bind(this)} />
        <RightSidebar show={this.state.hasLoaded} pageInfo={this.state.pageInfo} onClick={this.selectProject.bind(this)} />
        <Navbar show={this.state.hasLoaded} pageInfo={this.state.pageInfo} onClick={this.selectProject.bind(this)} />
        <LoadingPage
          show={!this.state.hasLoaded}
          loaded={this.state.itemsLoaded}
          total={this.state.itemsTotal}
        />
         {/* <ARModal show={this.state.hasLoaded && !this.state.showOverlay} /> */}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected_ar_project: state.selected_ar_project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedArProject: project => dispatch(setSelectedArProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BedfordSquare);
