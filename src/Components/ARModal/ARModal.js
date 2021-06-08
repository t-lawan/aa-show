import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Colours } from "../Global/global.styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "../../Utility/Richtext";

const ARModalWrapper = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 0;
  width: ${props => (props.showARSection ? "50vw" : "20vw")};
  height: ${props => (props.showARSection ? "30vh" : "5vh")};
  left: ${props => (props.showARSection ? "25vw" : "40vw")};
  /* background: ${Colours.light_green_translucent}; */
`;

const ARLink = styled(Link)``;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh 0.5vw;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
const ARModal = props => {
  const [showARSection, setShowARSection] = useState(false);

  const toggleDisplay = () => {
    setShowARSection(!showARSection);
  };


  return (
    <ARModalWrapper
      showARSection={showARSection}
      onClick={props.onClick}
      show={props.show}
    >
      <ContentWrapper onClick={toggleDisplay}>
        {showARSection ? (
            <React.Fragment>
            <p> Are you in Bedford Square?</p>
            <ButtonWrapper>
                <p> Yes</p>
                <p> No</p>

            </ButtonWrapper>
            </React.Fragment>
        ) : (
          <p> AR</p>
        )}
      </ContentWrapper>
    </ARModalWrapper>
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
)(ARModal);