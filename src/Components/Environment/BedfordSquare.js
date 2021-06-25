import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Colours, size } from "../Global/global.styles";
import RequestManager from "../../Utility/Managers/RequestManager";
import { GLTFLoader } from "../../Utility/Loaders/GLTFLoader.js";
import Astronaut from "../../Assets/Models/Astronaut.glb";
import LoadingPage from "../Loading/LoadingPage/LoadingPage";
import Overlay from "../Overlay/Overlay";
import { setSelectedArProject } from "../../Store/action";
import { connect } from "react-redux";
import {
  OrbitControls,
  MapControls
} from "../../Utility/OrbitControls/OrbitControls";
import ContextModel from "../../Assets/Models/Context.glb";
import AAWingModel from "../../Assets/Models/AAWing.glb";
import EastSideModel from "../../Assets/Models/EastSide.glb";
import NorthSideModel from "../../Assets/Models/NorthSide.glb";
import SouthSideModel from "../../Assets/Models/SouthSide.glb";
import RoadOutlineModel from "../../Assets/Models/RoadOutline.glb";
import ARModal from "../ARModal/ARModal";
import Navbar from "../Navbar/Navbar";
import { EffectComposer } from "../../Utility/EffectComposer";
import { RenderPass } from "../../Utility/RenderPass";
import { UnrealBloomPass } from "../../Utility/UnrealBloomPass";
import Device from "../../Utility/Device";
import AAIS from "../../Assets/Models/AAIS3js.glb";
import ARCHIVE from "../../Assets/Models/ARCHIVES3JS.glb";
import COMMUNICATIONMEDIA from "../../Assets/Models/COMMUNICATIONMEDIA3JS.glb";
import DESIGNMAKE from "../../Assets/Models/DESIGNMAKE3JS.glb";
import DIP13 from "../../Assets/Models/DIP13JS.glb";
import DIP23 from "../../Assets/Models/DIP23JS.glb";
import DIP33 from "../../Assets/Models/DIP33JS.glb";
import DIP43 from "../../Assets/Models/DIP43JS.glb";
import DIP53 from "../../Assets/Models/DIP53JS.glb";
import DIP63 from "../../Assets/Models/DIP63js.glb";
import DIP73 from "../../Assets/Models/DIP73JS.glb";
import DIP83 from "../../Assets/Models/DIP83js.glb";
import DIP93 from "../../Assets/Models/DIP93js.glb";
import DIP103 from "../../Assets/Models/DIP103JS.glb";
import DIP113 from "../../Assets/Models/DIP113JS.glb";
import DIP123 from "../../Assets/Models/DIP123JS.glb";
import DIP133 from "../../Assets/Models/DIP133JS.glb";
import DIP143 from "../../Assets/Models/DIP143JS.glb";
import DIP153 from "../../Assets/Models/DIP153JS.glb";
import DIP163 from "../../Assets/Models/DIP163JS.glb";
import DIP173 from "../../Assets/Models/DIP173JS.glb";
import DIP183 from "../../Assets/Models/DIP183js.glb";
import DIP193 from "../../Assets/Models/DIP193js.glb";
import DIP203 from "../../Assets/Models/DIP203js.glb";
import DIP213 from "../../Assets/Models/DIP213JS.glb";
import DRL from "../../Assets/Models/DRL3js.glb";
import EMTECH from "../../Assets/Models/EMTECH3JS.glb";
import ETS from "../../Assets/Models/ETS3js.glb";
import EX13 from "../../Assets/Models/EX13JS.glb";
import EX23 from "../../Assets/Models/EX23js.glb";
import EX33 from "../../Assets/Models/EX33JS.glb";
import EX43 from "../../Assets/Models/EX43JS.glb";
import EX53 from "../../Assets/Models/EX53JS.glb";
import EX63 from "../../Assets/Models/EX63js.glb";
import EX73 from "../../Assets/Models/EX73js.glb";
import EX83 from "../../Assets/Models/EX83JS.glb";
import EX93 from "../../Assets/Models/EX93js.glb";
import EX103 from "../../Assets/Models/EX103JS.glb";
import EX113 from "../../Assets/Models/EX113JS.glb";
import EX123 from "../../Assets/Models/EX123js.glb";
import EX133 from "../../Assets/Models/EX133js.glb";
import EX143 from "../../Assets/Models/EX143JS.glb";
import EX153 from "../../Assets/Models/EX153JS.glb";
import EX163 from "../../Assets/Models/EX163JS.glb";
import EX173 from "../../Assets/Models/EX173js.glb";
import EX183 from "../../Assets/Models/EX183js.glb";
import Foundation from "../../Assets/Models/Foundation3JS.glb";
import FY3 from "../../Assets/Models/FY3js.glb";
import Groundlab from "../../Assets/Models/GroundLab3js.glb";
import HCT from "../../Assets/Models/HCT3js.glb";
import HistoryTheory from "../../Assets/Models/HISTORYTHEORY3JS.glb";
import HousingUrbanism from "../../Assets/Models/HOUSINGURBANISM3JS.glb";
import Lawun from "../../Assets/Models/LAWUN3JS.glb";
import LU from "../../Assets/Models/LU3js.glb";
import PHD from "../../Assets/Models/PHD3js.glb";
import ProfessionalPractice from "../../Assets/Models/PROFESSIONALPRACTICE3JS.glb";
import ProjectCities from "../../Assets/Models/PROJECTIVECITIES3JS.glb";
import SED from "../../Assets/Models/SED3JS.glb";
import VISITINGSCHOOL from "../../Assets/Models/VISITINGSCHOOL3JS.glb";
import WOODLAB from "../../Assets/Models/WOODLAB3JS.glb";

const ModelMap = {
  "AAIS3js.glb": AAIS,
  "ARCHIVES3JS.glb": ARCHIVE,
  "COMMUNICATIONMEDIA3JS.glb": COMMUNICATIONMEDIA,
  "DESIGNMAKE3JS.glb": DESIGNMAKE,
  "DIP13JS.glb": DIP13,
  "DIP23JS.glb": DIP23,
  "DIP33JS.glb": DIP33,
  "DIP43JS.glb": DIP43,
  "DIP53JS.glb": DIP53,
  "DIP63js.glb": DIP63,
  "DIP73JS.glb": DIP73,
  "DIP83js.glb": DIP83,
  "DIP93js.glb": DIP93,
  "DIP103JS.glb": DIP103,
  "DIP113JS.glb": DIP113,
  "DIP123JS.glb": DIP123,
  "DIP133JS.glb": DIP133,
  "DIP143JS.glb": DIP143,
  "DIP153JS.glb": DIP153,
  "DIP163JS.glb": DIP163,
  "DIP173JS.glb": DIP173,
  "DIP183js.glb": DIP183,
  "DIP193js.glb": DIP193,
  "DIP203js.glb": DIP203,
  "DIP213JS.glb": DIP213,
  "DRL3js.glb": DRL,
  "EMTECH3JS.glb": EMTECH,
  "ETS3js.glb": ETS,
  "EX13JS.glb": EX13,
  "EX23js.glb": EX23,
  "EX33JS.glb": EX33,
  "EX43JS.glb": EX43,
  "EX53JS.glb": EX53,
  "EX63js.glb": EX63,
  "EX73js.glb": EX73,
  "EX83JS.glb": EX83,
  "EX93js.glb": EX93,
  "EX103JS.glb": EX103,
  "EX113JS.glb": EX113,
  "EX123js.glb": EX123,
  "EX133js.glb": EX133,
  "EX143JS.glb": EX143,
  "EX153JS.glb": EX153,
  "EX163JS.glb": EX163,
  "EX173js.glb": EX173,
  "EX183js.glb": EX183,
  "Foundation3JS.glb": Foundation,
  "FY3js.glb": FY3,
  "GroundLab3js.glb": Groundlab,
  "HCT3js.glb": HCT,
  "HISTORYTHEORY3JS.glb": HistoryTheory,
  "HOUSINGURBANISM3JS.glb": HousingUrbanism,
  "LAWUN3JS.glb": Lawun,
  "LU3js.glb": LU,
  "PHD3js.glb": PHD,
  "PROFESSIONALPRACTICE3JS.glb": ProfessionalPractice,
  "PROJECTIVECITIES3JS.glb": ProjectCities,
  "SED3JS.glb": SED,
  "VISITINGSCHOOL3JS.glb": VISITINGSCHOOL,
  'WOODLAB3JS.glb': WOODLAB
};

const BedfordSquareWrapper = styled.div`
  height: 100vh;
  display: ${props => (props.show ? "block" : "none")};
  z-index: 50;
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
  baseColor = new THREE.Color(0, 0, 0);
  centerPoint = new THREE.Vector3(0, 30, 0);
  constructor(props) {
    super(props);
    this.state = {
      showInstructions: true,
      hasLoaded: false,
      itemsLoaded: 0,
      itemsTotal: 0,
      showOverlay: false,
      showSidebar: true,
      projects: [],
      pageInfo: null,
      isReady: false
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
    this.onWindowResize();
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
    // this.setupPostProcessing()
  };

  initLoadingObjects = async () => {
    let pageInfo = await RequestManager.getPageInfo();
    let projects = await RequestManager.getProjects();
    projects.forEach(async project => {
      if (project.shouldDisplay) {
        //  this.addCube(project);
        this.addObject(project, project.modelUrl);
      }
    });
    // console.log('PROJECTS', projects);
    this.setState({
      projects: projects,
      pageInfo: pageInfo
    });
  };

  setupScene = () => {
    this.scene = new THREE.Scene();
  };

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      17, // fov = field of view
      this.mount.clientWidth / this.mount.clientHeight, // aspect ratio
      0.1, // near plane
      1500 // far plane
    );
    const pointLight = new THREE.PointLight(0xffffff, 1);
    this.camera.add(pointLight);

    // this.camera.position.set(300,300,1000);
    if (Device.isMobile()) {
      this.camera.position.set(
        -985.181093860796,
        393.4537648390991,
        264.9690040807232
      );
    } else {
      this.camera.position.set(
        -378.84945316153204,
        296.98474526932074,
        311.5819434772792
      );
    }
    // this.camera.position.y = 40;
    // this.camera.position.z = 40;
  };

  setupPostProcessing = () => {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const params = {
      exposure: 2,
      bloomStrength: 1.5,
      bloomThreshold: 1,
      bloomRadius: 0.7
    };
    this.unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.unrealBloomPass.threshold = params.bloomThreshold;
    this.unrealBloomPass.strength = params.bloomStrength;
    this.unrealBloomPass.radius = params.bloomRadius;

    this.composer.addPass(this.unrealBloomPass);
  };

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.mount);
    this.controls.minDistance = 60;
    this.controls.maxDistance = 1200;
    this.controls.screenSpacePanning = true;
    this.controls.enablePan = false;
    this.controls.target = this.centerPoint;
    this.controls.maxPolarAngle = Math.PI / 2;
  };

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      premultipliedAlpha: true
    });
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
    console.log("HAS LOADED");
    // this.onWindowResize();
  };

  loadError = url => {
    console.log("ERROR", url);
  };

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
    this.addEnvironmentObject(ContextModel, "CONTEXT");
    this.addEnvironmentObject(AAWingModel, "AAWING");
    this.addEnvironmentObject(RoadOutlineModel, "RoadOutline");
    this.addEnvironmentObject(NorthSideModel, "NorthSide");
    this.addEnvironmentObject(SouthSideModel, "SouthSide");
    this.addEnvironmentObject(EastSideModel, "EastSide");
  };

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

  addEnvironmentObject = (object, name) => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();

    loader.load(object, gltf => {
      mesh = gltf.scene;
      mesh.name = name;
      mesh.position.z = 0;
      // mesh.position.y = -25;
      this.scene.add(mesh);
    });
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

    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(coordinate.x, coordinate.y, coordinate.z);
    this.baseColor = cube.material.color;
    cube.userData.isClickable = true;
    cube.userData.project = project;
    cube.userData.baseColor = this.baseColor;
    cube.visible = true;

    this.scene.add(cube);

    this.clickableObjects.push(cube);
  };

  loadModel = async (url) => {
    const loader = new GLTFLoader(this.manager);
    // let mesh = new THREE.Object3D();
    // const coordinate = project.coordinate;

    return new Promise(resolve => {
      loader.load(url, resolve);
    });
  };

  addObject = async (project, object = Astronaut) => {
    const loader = new GLTFLoader(this.manager);

    

    // return new Promise((resolve, reject) => {
      let file = ModelMap[project.fileName]
      if(file){
        let gltf = await this.loadModel(file);
        let mesh = new THREE.Object3D();
        const coordinate = project.coordinate;

        // loader.load(
        //   ModelMap[project.fileName],
        //   gltf => {
            mesh = gltf.scene;
            mesh.userData.project = project;
            mesh.position.x = coordinate.x;
            mesh.position.y = coordinate.y;
            // mesh.position.y = 0;
            mesh.position.z = coordinate.z;
            mesh.visible = true;
            mesh.children[0].userData.project = project;
            let color = new THREE.Color(Colours.light_green);
            if (
              mesh.children.length > 0 &&
              mesh.children[0] &&
              mesh.children[0].material &&
              mesh.children[0].material.color
            ) {
              color = mesh.children[0].material.color;
            }
            this.baseColor = color;
            mesh.userData.baseColor = color;
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            // console.log('ADD MESH', mesh)
            this.scene.add(mesh);
            this.clickableObjects.push(mesh);
            // resolve(true)
          // },
          // undefined,
          // error => {
          //   console.log("ERROR", error);
          // }
        // );
      } else {
        console.log("PROJECT", project.unit);

      }

    // , undefined, reject)
    // })

    // }

    // , undefined, (error) => {
    //     if(!project.hasReTried){
    //       project.hasReTried = true;
    //       this.addObject(project, object);
    //     }
    // });
  };

  findMeshFromProject = project => {
    let mesh = this.clickableObjects.find(obj => {
      return obj.userData.project.title == project.title;
    });

    return mesh;
  };

  startAnimationLoop = () => {
    this.clickableObjects.forEach(mesh => {
      if (mesh.userData.project && mesh.userData.project.rotation) {
        mesh.rotation.x += mesh.userData.project.rotation.x;
        mesh.rotation.y += mesh.userData.project.rotation.y;
        mesh.rotation.z += mesh.userData.project.rotation.z;
      }
    });
    this.renderer.render(this.scene, this.camera);
    // this.composer.render();

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  addEventListener = () => {
    window.addEventListener("resize", this.onWindowResize);
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    document.addEventListener("dblclick", this.onDoubleClick, false);
    document.addEventListener("touchstart", this.onTouchStart, false);
    document.addEventListener("touchend", this.onTouchEnd, false);
    document.addEventListener("touchmove", this.onTouchMove, false);
  };

  removeEventListener = () => {
    window.removeEventListener("resize", this.onWindowResize);
    document.removeEventListener("mousemove", this.onDocumentMouseMove);
    document.removeEventListener("dblclick", this.onDoubleClick);
    document.removeEventListener("touchstart", this.onTouchStart);
    document.removeEventListener("touchend", this.onTouchEnd);
    document.removeEventListener("touchmove", this.onTouchMove);
  };

  onTouchStart = () => {};

  onTouchMove = () => {};

  onTouchEnd = () => {};

  onWindowResize = () => {
    console.log("onWindowResize");
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    // this.composer.setSize( width, height );
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  onDocumentMouseMove = event => {
    event.preventDefault();
    if (this.state.showInstructions && this.state.hasLoaded) {
      // setTimeout(() => {
      //   this.setState({
      //     showInstructions: false
      //   })
      // }, 5000)
    }
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
      if (obj.material) {
        obj.material.color = new THREE.Color(0x87ffd7);
      }
      // console.log('OBJ', obj)
      let project = obj.parent.userData.project;
      if (project) {
        this.props.setSelectedArProject(project);
        this.showOverlay();
      }
    }
  };

  showOverlay = () => {
    this.setState({
      showOverlay: true
    });
  };

  hideOverlay = () => {
    this.setState({
      showOverlay: false
    });
  };

  selectProject = project => {
    if (project.shouldDisplay) {
      this.highlightProject(project);
      // Move towards totem

      let mesh = this.findMeshFromProject(project);
      if (mesh) {
        this.controls.target = mesh.position;
        this.controls.dollyOut(20);
        this.controls.saveState();

        this.controls.update();
        this.props.setSelectedArProject(project);
        this.setState({
          showOverlay: true
        });
      }

      //  console.log('AFTER',this.camera.position.distanceTo(mesh.position) )
    }
  };

  resetTarget = () => {
    // this.controls.target = this.centerPoint;
    // this.controls.scale(10);
    // this.controls.reset();
    this.controls.update();
  };

  highlightProject = project => {
    if (project.shouldDisplay) {
      this.turnOffAllClickableObjects();

      let mesh = this.findMeshFromProject(project);
      // mesh.children[0].material.color = new THREE.Color( 0x87ffd7);
      if (mesh) {
        mesh.traverse(child => {
          if (child.material && child.material.color) {
            child.material.color = new THREE.Color(0x87ffd7);
          }
        });
      }
    }
  };

  closeOverlay = () => {
    this.hideOverlay();
    // setTimeout(() => {
    //   this.turnOffAllClickableObjects()
    // }, 10000)
    this.resetTarget();
  };

  turnOffAllClickableObjects = () => {
    this.clickableObjects.forEach(mesh => {
      mesh.traverse(child => {
        if (child.material) {
          if (child.material && child.material.color) {
            child.material.color = mesh.userData.baseColor;
          }
        }
      });
    });
  };

  setIsReadyToTrue = () => {
    this.setState({
      isReady: true
    });
    setTimeout(() => {
      this.onWindowResize();
    }, 10);
  };

  closeInstructions = () => {
    this.setState({
      showInstructions: false
    });
  };

  render() {
    return (
      <>
        <BedfordSquareWrapper
          show={this.state.isReady}
          ref={ref => (this.mount = ref)}
        />
        <Overlay
          onClick={() => this.closeOverlay()}
          show={this.state.showOverlay}
        />
        {/* <Sidebar show={this.state.hasLoaded} projects={this.state.projects} pageInfo={this.state.pageInfo} onClick={this.selectProject.bind(this)} />
        <RightSidebar show={this.state.hasLoaded} pageInfo={this.state.pageInfo} onClick={this.selectProject.bind(this)} /> */}
        <Navbar
          show={this.state.isReady}
          pageInfo={this.state.pageInfo}
          onClick={(project) => this.selectProject(project)}
        />
        <LoadingPage
          show={!this.state.isReady}
          hasLoaded={this.state.hasLoaded}
          loaded={this.state.itemsLoaded}
          onClick={() => this.setIsReadyToTrue()}
          total={this.state.itemsTotal}
        />
        <ARModal show={this.state.hasLoaded && !this.state.showOverlay} />
        {/* <Instructions show={this.state.hasLoaded && this.state.showInstructions} onClick={this.selectProject.bind(this)} /> */}
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
