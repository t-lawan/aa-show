import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { Colours, size } from "../Components/Global/global.styles";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { PageURls } from "../Utility/Misc";
import Ticker from "../Components/Ticker/Ticker";
import {
  TopRightText,
  BottomLeftText,
  BottomRightText,
  TopLeftText
} from "../Components/Loading/LoadingPage/LoadingPage";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${Colours.orange};
`;

export const Title = styled.p`
  text-align: center;
  margin: 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2.2vh;

  /* font-size: 2vh; */

  @media (max-width: ${size.tablet}) {
    /* padding: 0 5vw; */
  }
`;

const Paragraph = styled.p`

  font-size: 2.2vh;

  text-align: center;

`;

const Warning = styled(Paragraph)`
  color: black;
  width: 60%;
  margin-top: 4vh;
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-column-gap: 1rem;
  grid-row-gap: 10rem;
  padding: 1rem;
  @media (max-width: ${size.tabletL}) {
    /* width: 90%; */
    grid-row-gap: 1rem;
    grid-template-columns: 1fr;
  }
`;

const LinksWrapper = styled.div``;

const Home = () => {
  let location = useLocation();
  const homeWrapper = useRef(null);

  let creditText = "CREDITS: CURATOR MANIJEH VERGHESE, CONCEPT AND DESIGN: CREAM PROJECTS, WEB AND AR DEVELOPMENT: AKINSOLA LAWANSON AND TAMAS PALL".split(
    " "
  );

  return (
    <Layout>
      <HomeWrapper ref={homeWrapper}>
        <LinksWrapper>
          <Paragraph>Are you in</Paragraph>
          <Paragraph>
            <StyledLink to={PageURls.AR_BEDFORD_SQUARE.url}>
              {" "}
              {"Bedford Square"}{" "}
            </StyledLink>
            or
            <StyledLink to={PageURls.AR_AT_HOME.url}> Elsewhere </StyledLink>
          </Paragraph>
        </LinksWrapper>

        <Warning>
          {" "}
          Please be aware of your surroundings during the AR experience{" "}
        </Warning>
        <TopLeftText>AA</TopLeftText>
        <TopRightText> AR</TopRightText>
        <BottomLeftText>20</BottomLeftText>
        <BottomRightText>21 </BottomRightText>
        <Ticker />
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
