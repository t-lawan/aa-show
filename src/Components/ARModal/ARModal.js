import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Colours, size } from "../Global/global.styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "../../Utility/Richtext";
import { PageURls } from "../../Utility/Misc";

const ARModalWrapper = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 0;
  width: ${props => (props.showARSection ? "50vw" : "20vw")};
  height: ${props => (props.showARSection ? "30vh" : "5vh")};
  left: ${props => (props.showARSection ? "25vw" : "40vw")};
  /* background: ${Colours.light_green_translucent}; */
  /* @media (max-width: ${size.tablet}) {
      display: none;
    } */
`;

const ARLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

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
  /* color: ${Colours.orange}; */
`

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
      // onClick={props.onClick} 
      show={props.show}
    >
      <ContentWrapper onClick={toggleDisplay}>
        {/* {showARSection ? (
            <React.Fragment>
            <Text> Are you in Bedford Square?</Text>
            <ButtonWrapper>
                <Text> Yes</Text>
                <ARLink to={PageURls.AR_AT_HOME.url}> No</ARLink>

            </ButtonWrapper>
            </React.Fragment>
        ) : (
          <Text> AR</Text>
        )} */}
        <ARLink to={PageURls.AR.url}> AR </ARLink>

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
