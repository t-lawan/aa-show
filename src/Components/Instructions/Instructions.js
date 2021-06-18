import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Colours, size, ZLayer } from "../Global/global.styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "../../Utility/Richtext";
import Device from "../../Utility/Device";

const InstructionsWrapper = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 0;
  width: 80%;
  height: 40%;
  left: 10%;
  background: ${Colours.light_green_translucent};
  background: transparent;
  z-index: ${ZLayer.INSTRUCTIONS};
`;

const InstructionText = styled.p`
  color: ${Colours.orange};
  font-size: 3vh;
  opacity: 1;
   transition: opacity .25s ease-in-out;
   -moz-transition: opacity .25s ease-in-out;
   -webkit-transition: opacity .25s ease-in-out;
   opacity: ${props => (props.show ? "1" : "0")};
  
  /* @media (max-width: ${size.tablet}) {
    font-size: 10vw;
  } */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh 0.5vw;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${Colours.orange};
`;
const Instructions = props => {
  return (
    <InstructionsWrapper onClick={props.onClick} show={props.show}>
      <ContentWrapper>
        {!Device.isMobile() ? (
          <>
            <InstructionText show={props.show}>mouse wheel - zoom</InstructionText>
            <InstructionText show={props.show}>left mouse button - rotate</InstructionText>
            <InstructionText show={props.show}> right mouse button - pan </InstructionText>
            <InstructionText show={props.show}>
              Select projects on the sidebars to zoom into the totem{" "}
            </InstructionText>
          </>
        ) : (
          <>
            <InstructionText show={props.show}>
              {" "}
              Pinch and Spread with two fingers to zoom
            </InstructionText>
            <InstructionText show={props.show}>
              {" "}
              Press and drag with one finger to rotate{" "}
            </InstructionText>
            <InstructionText show={props.show}> 
              {" "}
              Select projects on the sliding navigation bar to view each totem
            </InstructionText>
            <InstructionText show={props.show}> Tap to start</InstructionText>
          </>
        )}
      </ContentWrapper>
    </InstructionsWrapper>
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
)(Instructions);
