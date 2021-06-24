import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { Colours, size } from "../Components/Global/global.styles";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { PageURls } from "../Utility/Misc";
import Ticker from "../Components/Ticker/Ticker";

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
  color: black;
  text-decoration: none;
    @media (max-width: ${size.tablet}) {
      padding: 0 5vw;
    }
  
`

const Paragraph = styled.p`
  color: white;
  font-size: 2vh;
  margin-top: 2vh;

` 

const Warning  = styled(Paragraph)`
  bottom: 20vh;
  position: absolute;
  text-align: center;
    width: 60%;
`


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

const TopLeftText = styled.h1`
  top: 0;
  left:0;
  position: absolute;
`

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
    align-items: center;
    width: 60%;
`

const Home = () => {
  let location = useLocation();
  const homeWrapper = useRef(null);

  let creditText = "CREDITS: CURATOR MANIJEH VERGHESE, CONCEPT AND DESIGN: CREAM PROJECTS, WEB AND AR DEVELOPMENT: AKINSOLA LAWANSON AND TAMAS PALL".split(' ')

  return (
    <Layout>
      <HomeWrapper ref={homeWrapper}>
      <LinksWrapper>
      <StyledLink to={PageURls.AR_BEDFORD_SQUARE.url}> {"Bedford Square".toUpperCase()}  </StyledLink>
        <StyledLink to={PageURls.AR_AT_HOME.url}> ELSEWHERE </StyledLink>
      </LinksWrapper>

        <Paragraph> PROJECTS REVIEW WEBSITE </Paragraph>
        <Warning> Please be aware of your surroundings during the AR experience </Warning>
        {/* <CreditsWrapper> 
        <ContentWrapper>
        {creditText.map((text, index) => (
            <Credits key={index}> {text} </Credits>

          ))}
        </ContentWrapper>

        </CreditsWrapper> */}
        <Ticker />
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
