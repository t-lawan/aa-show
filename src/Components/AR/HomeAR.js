import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AstronautGLB from "../../Assets/Models/Astronaut.glb";
import AstronautUSDZ from "../../Assets/Models/Astronaut.usdz";
import "@google/model-viewer";
import { Link } from "react-router-dom";
import { ZLayer, Colours } from "../Global/global.styles";
import RequestManager from "../../Utility/Managers/RequestManager";

const HomeARWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  model-viewer {
    width: 100%;
    height: 100%;
    z-index: ${ZLayer.MODEL_VIEWER};
  }
`;

const ActivateARButton = styled.p`
  /* color: white;
  background: red; */
  color: ${Colours.light_green};

  border-radius: 4px;
  border: none;
  position: absolute;
  bottom: 1vw;
  right: 1vw;
  padding: 1vw;
`;

const ExitARButton = styled(ActivateARButton)`
  right: auto;
  left: 1vw;
`;

const ModelViewer = styled('model_viewer')`
::part(default-progress-bar){
  background-color: pink;
}
`

const ARLink = styled(Link)`
  position: absolute;
  top: 1vh;
  left: 1vw;
  padding: 1vw;
  cursor: cell;
  /* background: red;  */
  color: ${Colours.light_green};

  z-index: ${ZLayer.MODEL_VIEWER_LINKS};
`;

const ResetButton = styled.p`
  position: absolute;
  bottom: 1vh;
  left: 1vw;
  z-index: ${ZLayer.MODEL_VIEWER_LINKS};
  color: ${Colours.light_green};

`

const HomeAR = props => {
  const [ hasFetchedProjects, setHasFetchedProjects ] = useState(false);
  const [ isChanging, setIsChanging ] = useState(false);

  const [ src, setSrc ] = useState('')
  const [ iosSrc, setIosSrc ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ savedProjects, setSavedProjects ] = useState([])
   
  let project = props.selected_ar_project;
  let projects = []
  let projectsViewed = []
  useEffect(() => {
    const getProjects = async () => {
      projects = await RequestManager.getProjects();
      projects = projects.filter((project) => {
        return project.showInArAtHome == true;
      })

      setSavedProjects(projects);

      if (projects) {
        setHasFetchedProjects(true); //set login state to true
        randomlySelectProject()
      }
    };
    if(projects.length === 0){
      getProjects();

    }
  }, []); //<-- run once when component mounted

  useEffect(() => {
    console.log('HI');
    projects = savedProjects;
    randomlySelectProject()
  }, [isChanging])

  const randomlySelectProject = () => {
    console.log('CLICKED', projects)
      if(projects.length > 0) {
        console.log('BEFORE', projects)

        let randomIndex = Math.floor(Math.random() * (projects.length -1)); 
        let project = projects[randomIndex];
        projects.splice(randomIndex, 1);
        projectsViewed.push(project)
        console.log('AFTER', projects)

         console.log('pr', project)

        setSrc(project.glbUrl)
        setIosSrc(project.usdzUrl)
        setTitle(project.title);
      } else {
        projects = savedProjects;
      }

      setIsChanging(false)
  }

  const reset = () => {
    if(!isChanging){
      setIsChanging(true);
    }
  }
  return (
    <HomeARWrapper>

      <ARLink to={"/bedford-square"}> Back To Bedford Square </ARLink>
      <ResetButton onClick={reset}> Reset</ResetButton>
      {/* <model-viewer src={Bear} ar ar-modes="webxr scene-viewer quick-look" camera-controls alt="Bear" ar-placement="floor" /> */}
      {hasFetchedProjects ? <model-viewer
        src={src}
        ios-src={iosSrc}
        ar
        alt={title}
        camera-controls
        alt="Astronaut"
        ar-placement="floor"
        ar-modes="webxr scene-viewer quick-look"
      >
        {/* <ActivateARButton slot="ar-button">Activate AR</ActivateARButton> */}
      </model-viewer> : null}
      
    </HomeARWrapper>
  );
};

// export default HomeAR;
const mapStateToProps = state => {
  return {
    selected_ar_project: state.selected_ar_project
  };
};

export default connect(
  mapStateToProps,
  null
)(HomeAR);
