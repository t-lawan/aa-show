import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AstronautGLB from "../../Assets/Models/Astronaut.glb";
import AstronautUSDZ from "../../Assets/Models/Astronaut.usdz";
import "@google/model-viewer";
import { Link } from "react-router-dom";
import { ZLayer } from "../Global/global.styles";

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
  color: white;
  background: red;
  border-radius: 4px;
  border: none;
  position: absolute;
  bottom: 1vw;
  right: 1vw;
  padding: 1vw;

`

const ExitARButton = styled(ActivateARButton)`
  right: auto;
  left: 1vw;
`

const ARLink = styled(Link)`
  position: absolute;
  top: 1vw;
  left: 1vw;
  padding: 1vw;
  cursor: cell;
  background: red;
  z-index: ${ZLayer.MODEL_VIEWER_LINKS};
`



const HomeAR = (props) => {
  let project = props.selected_ar_project;
  console.log('PROJECT', project)
  return (
    <HomeARWrapper>
      <ARLink to={'/bedford-square'}> Back To Bedford Square </ARLink>
      {/* <model-viewer src={Bear} ar ar-modes="webxr scene-viewer quick-look" camera-controls alt="Bear" ar-placement="floor" /> */}
      <model-viewer
        src={project ? project.glbUrl: AstronautGLB}
        ios-src={project ? project.usdzUrl: AstronautUSDZ}
        ar
        camera-controls
        alt="Astronaut"
        ar-placement="floor"
      >
        <ActivateARButton
          slot="ar-button"
        >
          Activate AR
        </ActivateARButton>
      </model-viewer>
    </HomeARWrapper>
  );
};

// export default HomeAR;
const mapStateToProps = state => {
  return {
    selected_ar_project: state.selected_ar_project,
  };
};



export default connect(
  mapStateToProps,
  null
)(HomeAR);