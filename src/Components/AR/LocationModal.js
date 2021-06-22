import React, { useState } from "react";
import styled from "styled-components";
import { Colours, ZLayer } from "../Global/global.styles";
import { connect } from "react-redux";
import "@google/model-viewer";
import { ActivateARButton } from "./HomeAR";


const LocationModalWrapper = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: absolute;
  top: 5vh;
  width: 80vw;
  height: 80vh;
  left: 10vw;
  background: ${Colours.grey};
  z-index: 200;
  animation: popup 350ms ease forwards;
transition: all 200ms ease;

  model-viewer {
    width: 100%;
    height: 100%;
    left: 0;
    /* top: 10%; */
    z-index: ${ZLayer.MODEL_VIEWER};
    background: transparent;
  }
`;

const CloseText = styled.p`
    z-index: ${ZLayer.MODEL_VIEWER_LINKS};

    position: absolute;
    top: 1%;
    right: 1%;

`

const CollectItemText = styled.p`
    z-index: ${ZLayer.MODEL_VIEWER_LINKS};
    display: ${props => (props.show ? "block" : "none")};

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


  return (
    <LocationModalWrapper
      show={props.show}
    >
        <CloseText onClick={() => props.onClose()}> Close </CloseText>
        <CollectItemText show={props.project && !props.project.collected} onClick={() => props.collectedItem(props.project)}> Collect Item </CollectItemText>
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
