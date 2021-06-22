import * as React from "react";
import styled from "styled-components";
import LoadingBar from "../LoadingBar/LoadingBar";
import { size, ZLayer, Colours } from "../../Global/global.styles";

const LoadingPageWrapper = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: ${Colours.grey};
  z-index: ${ZLayer.LOADING_PAGE};
`;

const Text = styled.h1`
  color: ${Colours.orange};
  text-align: center;
`;

const Paragraph = styled.p`
  color: white;
  font-size: 2vh;
  text-align: center;

`;

const Button = styled.h1`
  color: ${Colours.orange};

`

const ContentWrapper = styled.div`
  top: 0;
  width: 100%;
  height: 90vh;
  /* height: -webkit-fill-available; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  align-items: center;
  @media (max-width: ${size.tabletL}) {
  }
`;

const LoadingBarWrapper = styled.div`
  width: 60%;
`;
const LoadingPage = props => {
  return (
    <LoadingPageWrapper show={props.show}>
      <ContentWrapper>
        <Text> AR21 </Text>
        <LoadingBarWrapper>
        <Paragraph>Welcome to the AA Augmented Review 2021.</Paragraph>
        <Paragraph>
          You will soon enter an interactive map of Bedford Square, showing
          contributions from each programme at the AA. To launch the Augmented
          Reality experience, in Bedford Square or from home, navitage to the
          bottom of the next page.
        </Paragraph>
        <Paragraph>
          Mobile: pinch and spread with two fingers to zoom, press and drag with
          one finger to rotate Desktop: use mousebuttons to pan, rotate and zoom
        </Paragraph>
        </LoadingBarWrapper>        
        {!props.hasLoaded ? (
          <LoadingBarWrapper>
          <LoadingBar show={true} loaded={props.loaded} total={props.total} />
        </LoadingBarWrapper>
        ) : (
          <Button onClick={() => props.onClick()}>
          ENTER
        </Button>
        )}

  
      </ContentWrapper>
    </LoadingPageWrapper>
  );
};

export default LoadingPage;
