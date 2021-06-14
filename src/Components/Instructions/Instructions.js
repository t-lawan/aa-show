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
  color: ${Colours.light_green};
  font-size: 3vh;
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
  color: ${Colours.light_green};
`;
const Instructions = props => {
  return (
    <InstructionsWrapper onClick={props.onClick} show={props.show}>
      <ContentWrapper>
        {!Device.isMobile() ? (
          <>
            <InstructionText>mouse wheel - zoom</InstructionText>
            <InstructionText>left mouse button - rotate</InstructionText>
            <InstructionText> right mouse button - pan </InstructionText>
            <InstructionText>Select projects on the sidebars to zoom into the totem </InstructionText>
          </>
        ) : (
          <>
            <InstructionText>
              {" "}
              Pinch and Spread with two fingers to zoom
            </InstructionText>
            <InstructionText>
              {" "}
              Press and drag with one finger to rotate{" "}
            </InstructionText>
            <InstructionText>
              {" "}
              Select projects on the sidebars to zoom into the totem
            </InstructionText>
            <InstructionText> Tap to start</InstructionText>
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
