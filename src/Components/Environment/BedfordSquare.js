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
import {OrbitControls, MapControls}from '../../Utility/OrbitControls/OrbitControls'
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
import Instructions from "../Instructions/Instructions";
import { EffectComposer } from "../../Utility/EffectComposer";
import { RenderPass } from "../../Utility/RenderPass";
import { UnrealBloomPass } from "../../Utility/UnrealBloomPass";
import Device from "../../Utility/Device";

const BedfordSquareWrapper = styled.div`
  height: 100vh;
  display: ${props => (props.show ? "block" : "none")};
  z-index: 50;
  @media (max-width: ${size.tablet}) {
    height:-webkit-fill-available;
  }
  

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
  centerPoint = new THREE.Vector3(0,30,0);
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
      pageInfo : null,
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
    this.onWindowResize()
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
    let pageInfo = await RequestManager.getPageInfo()
    let projects = await RequestManager.getProjects();
    projects.forEach(project => {
      if(project.shouldDisplay){
        //  this.addCube(project); 
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
      17, // fov = field of view
      this.mount.clientWidth / this.mount.clientHeight, // aspect ratio
      0.1, // near plane
      1500 // far plane
    );
    const pointLight = new THREE.PointLight( 0xffffff, 1 );
		this.camera.add( pointLight );
    
    // this.camera.position.set(300,300,1000);
    if(Device.isMobile()){
      this.camera.position.set(
        -985.181093860796,
        393.4537648390991,
        264.9690040807232
      )
    } else {
      this.camera.position.set(-378.84945316153204,296.98474526932074,311.5819434772792);

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
    this.unrealBloomPass = new UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
    this.unrealBloomPass.threshold = params.bloomThreshold;
    this.unrealBloomPass.strength = params.bloomStrength;
    this.unrealBloomPass.radius = params.bloomRadius;

    this.composer.addPass(this.unrealBloomPass);



  }

  setupControls = () => {
    this.controls = new OrbitControls(this.camera, this.mount);
    this.controls.minDistance  = 60;
    this.controls.maxDistance = 1200;
    this.controls.screenSpacePanning = true;
    this.controls.enablePan = false;
    this.controls.target = this.centerPoint;
    this.controls.maxPolarAngle = Math.PI/2;
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
    this.addEnvironmentObject(ContextModel, 'CONTEXT');
    this.addEnvironmentObject(AAWingModel, 'AAWING');
    this.addEnvironmentObject(RoadOutlineModel, 'RoadOutline');
    this.addEnvironmentObject(NorthSideModel, 'NorthSide');
    this.addEnvironmentObject(SouthSideModel, 'SouthSide');
    this.addEnvironmentObject(EastSideModel, 'EastSide');

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
    console.log('CLIC', this.clickableObjects)
    let mesh =this.clickableObjects.find((obj) => {
      return obj.userData.project.title == project.title;
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

  onTouchStart = () => {

  }

  onTouchMove = () => {
    
  }

  onTouchEnd = () => {

  }

  onWindowResize = () => {
    console.log('onWindowResize')
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
    if(this.state.showInstructions && this.state.hasLoaded){
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
    console.log('CONTROLS', this.camera.position)
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
        this.showOverlay()
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

  selectProject = (project) => {
    if(project.shouldDisplay){
      this.highlightProject(project);
      // Move towards totem
      console.log('project', project);

      let mesh = this.findMeshFromProject(project);
      console.log('MESH', mesh);
      if(mesh){
        this.controls.target = mesh.position;
        this.controls.dollyOut(20);
        this.controls.saveState()
  
        this.controls.update()
        this.props.setSelectedArProject(project);
        this.setState({
          showOverlay: true
        });
      }

    //  console.log('AFTER',this.camera.position.distanceTo(mesh.position) )

    }
  }

  resetTarget = () => {
    console.log('BEFORE', this.controls)
    // this.controls.target = this.centerPoint;
    // this.controls.scale(10);
    // this.controls.reset();
    this.controls.update()
    console.log('AFTER', this.controls)

  }

  highlightProject = (project) => {
    if(project.shouldDisplay) {
      this.turnOffAllClickableObjects()

      let mesh = this.findMeshFromProject(project)
      // mesh.children[0].material.color = new THREE.Color( 0x87ffd7);
      if(mesh) {
        mesh.traverse((child) => {
          if(child.material && child.material.color){
            child.material.color = new THREE.Color( 0x87ffd7);
          }
        })
      }



      setTimeout(() => {
        // mesh.traverse((child) => {
        //   if(child.material){
        //     child.material.color = mesh.userData.baseColor;

        //   }
        // })

        // if(this.state.showOverlay){
        //   this.closeOverlay()
        // }


        // mesh.children[0].material.color = new THREE.Color(255,255,255);
      }, 10000)

      // console.log('highlightProject', mesh)
    }
  }

  closeOverlay = () => {
    this.hideOverlay();
    // setTimeout(() => {
    //   this.turnOffAllClickableObjects()
    // }, 10000)
    this.resetTarget();

  }

  turnOffAllClickableObjects = () => {
    this.clickableObjects.forEach((mesh) => {
      mesh.traverse((child) => {
        if(child.material){
          child.material.color = mesh.userData.baseColor;

        }
      })
    })
  }

  setIsReadyToTrue = () => {
    console.log('IS READU')
    this.setState({
      isReady: true
    })
    setTimeout(() => {


    this.onWindowResize();

    }, 10)



  }

  closeInstructions = () => {
    this.setState({
      showInstructions: false
    })
  }

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
        <Navbar show={this.state.isReady} pageInfo={this.state.pageInfo} onClick={this.selectProject.bind(this)} />
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
