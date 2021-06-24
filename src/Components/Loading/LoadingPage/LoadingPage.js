import * as React from "react";
import styled from "styled-components";
import LoadingBar from "../LoadingBar/LoadingBar";
import { size, ZLayer, Colours } from "../../Global/global.styles";
import Ticker from "../../Ticker/Ticker";

const LoadingPageWrapper = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: ${Colours.orange};
  z-index: ${ZLayer.LOADING_PAGE};
  @media (max-width: ${size.tablet}) {
    height: -webkit-fill-available;
  }
`;

const Paragraph = styled.p`
  color: black;
  font-size: 2.2vh;
  text-align: center;
  @media (max-width: ${size.mobileL}) {
  font-size: 1.6vh;
  }
`;

const Button = styled.h1`
  color: black;
`;

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
  width: 80%;
`;

const Text = styled.h1`
  color: black;
  position: absolute;
  color: black;
  margin: 0;
  font-size: 10vw;
  @media (max-width: ${size.tablet}) {
    font-size: 10vh;
  }
`;

const TopLeftText = styled(Text)`
  top: 5vh;
  left: 5vw;
  @media (max-width: ${size.tablet}) {
    top: 2vh;
    left: 2vw;
  }
`;
const TopRightText = styled(Text)`
  top: 5vh;
  right: 5vw;
  @media (max-width: ${size.tablet}) {
    top: 2vh;
    right: 2vw;
  }
`;

const BottomLeftText = styled(Text)`
  bottom: 1vh;
  left: 5vw;
  @media (max-width: ${size.tablet}) {
    bottom: 2vh;
  }
`;

const BottomRightText = styled(Text)`
  bottom: 1vh;
  right: 5vw;
  @media (max-width: ${size.tablet}) {
    bottom: 2vh;
  }
`;

const BottomCenterText = styled.p`
  bottom: 1vh;
  text-align: center;
  position: absolute;
  font-size: 2.2vh;
  width: 100%;
  /* margin:0; */
`;
const LoadingPage = props => {
  return (
    <LoadingPageWrapper show={props.show}>
      <TopLeftText>AA</TopLeftText>
      <TopRightText> AR</TopRightText>
      <BottomLeftText>20</BottomLeftText>
      <BottomRightText>21 </BottomRightText>
      {/* <Ticker /> */}
      {/* <BottomCenterText>or go to the AA PR Website</BottomCenterText> */}
      <ContentWrapper>
        {/* <Text> AR21 </Text> */}
        <LoadingBarWrapper>
          <Paragraph>
            Welcome to the AA Augmented Reality Interactive Experience as part
            of Projects Review 2021.
          </Paragraph>
          <Paragraph>
            You will soon enter an interactive map of Bedford Square, which will
            encompass contributions from every unit and programme at AA in the
            form of geolocated totemic artefacts. To launch the Augmented
            Reality (AR) experience on your mobile – in Bedford Square or from
            elsewhere – navigate to the bottom of the next page.
          </Paragraph>
          <Paragraph>
            If you are in Bedford Square, search for the different totemic
            objects and collect strawberries along the way, in homage to the
            annual AA tradition of the strawberry tables, which take centre
            stage during the Projects Review Private View. If you are accessing
            the exhibition from elsewhere, select the object of your choice and
            scale it to sit within your immediate environment, wherever you are
            in the world.
          </Paragraph>
          <Paragraph>
            Take photographs of the objects you discover and share them on
            Instagram, tagging #AAar21 and @aaschool in your posts and stories,
            so we can share these on the AA Instagram account. We hope you enjoy
            exploring this wonderful world of objects, agendas and experiences
            as part of the Projects Review 2021 exhibition. For more information
            about the work of the units and programmes, and to view the series
            of short films and individual student projects, please visit
            pr2021.aaschool.ac.uk
          </Paragraph>
          <Paragraph>
          Desktop: use mouse buttons to rotate and zoom    
          </Paragraph>
          <Paragraph>
          Mobile: pinch and spread with two fingers to zoom; press and drag with one finger to rotate

          </Paragraph>
        </LoadingBarWrapper>
        {!props.hasLoaded ? (
          <LoadingBarWrapper>
            <LoadingBar show={true} loaded={props.loaded} total={props.total} />
          </LoadingBarWrapper>
        ) : (
          <Button onClick={() => props.onClick()}>ENTER</Button>
        )}
      </ContentWrapper>
    </LoadingPageWrapper>
  );
};

export default LoadingPage;
