import * as React from "react";
import styled from "styled-components";
import LoadingBar from "../LoadingBar/LoadingBar";
import { size, ZLayer, Colours } from "../../Global/global.styles";

const LoadingPageWrapper = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: ${Colours.orange};
  z-index: ${ZLayer.LOADING_PAGE};
`;



const Paragraph = styled.p`
  color: black;
  font-size: 2.2vh;
  text-align: center;

`;

const Button = styled.h1`
  color: black;

`

const ContentWrapper = styled.div`
  top: 20vh;
  position: absolute;
  width: 100%;
  height: 60vh;
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


const Text = styled.h1`
  color: black;
  position: absolute;
  color: black;
  margin:0;
  font-size: 10vw;
  @media (max-width: ${size.tablet}) {
  font-size: 10vh;
  }
`;


const TopLeftText = styled(Text)`
  top: 5vh;
  left:5vw;
`
const TopRightText = styled(Text)`
  top: 5vh;
  right:5vw;
`

const BottomLeftText = styled(Text)`
  bottom: 1vh;
  left:5vw;
  @media (max-width: ${size.tablet}) {
    bottom: 5vh;
  }
`

const BottomRightText = styled(Text)`
  bottom: 1vh;
  right:5vw;
  @media (max-width: ${size.tablet}) {
  bottom: 5vh;

  }
`

const BottomCenterText = styled.p`
  bottom: 1vh;
  text-align: center;
  position: absolute;
  font-size: 2.2vh;
  width: 100%;
  /* margin:0; */

`
const LoadingPage = props => {
  return (
    <LoadingPageWrapper show={props.show}>
      <TopLeftText>AA</TopLeftText>
      <TopRightText> AR</TopRightText>
      <BottomLeftText>20</BottomLeftText>
      <BottomRightText>21 </BottomRightText>
      <BottomCenterText>or go to the AA PR Website</BottomCenterText>
      <ContentWrapper>
        {/* <Text> AR21 </Text> */}
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
