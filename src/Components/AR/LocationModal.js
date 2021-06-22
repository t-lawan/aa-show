import React, { useState } from "react";
import styled from "styled-components";
import { Colours, ZLayer } from "../Global/global.styles";
import { connect } from "react-redux";
import "@google/model-viewer";
import { ActivateARButton } from "./HomeAR";


const LocationModalWrapper = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 10vh;
  width: 80vw;
  height: 80vh;
  left: 10vw;
  background: ${Colours.orange};
  z-index: 200;

  model-viewer {
    width: 90vw;
    height: 90%;
    left: 0;
    top: 10%;
    z-index: ${ZLayer.MODEL_VIEWER};
  }
`;

const CloseText = styled.p`
    position: absolute;
    top: 1%;
    right: 1%;

`

const CollectItemText = styled.p`
    position: absolute;
    top: 7.5%;
    text-align: center;
    width: 100%;
    /* left: 50%; */
`


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh 0.5vw;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Text = styled.p`
  color: ${Colours.orange};
`


const LocationModal = props => {
  const [showARSection, setShowARSection] = useState(false);



  return (
    <LocationModalWrapper
      show={props.show}
    >
        <CloseText onClick={() => props.onClose()}> Close </CloseText>
        <CollectItemText> Collect Item </CollectItemText>
        {props.project ? (
            <model-viewer
        // src={AstronautGLB}
        // ios-src={AstronautUSDZ}
        src={props.project.glbUrl}
        ios-src={props.project.usdzUrl}
        ar
        // ar-modes="webxr scene-viewer quick-look"
        alt={props.project.title}
        camera-controls
        alt="Astronaut"
        ar-placement="floor"
      >
        <ActivateARButton slot="ar-button">AR</ActivateARButton>
      </model-viewer>
        ) : null}

    </LocationModalWrapper>
  );
};

const mapStateToProps = state => {
  return {
    selected_ar_project: state.selected_ar_project
  };
};

export default connect(
  mapStateToProps,
  null
)(LocationModal);
