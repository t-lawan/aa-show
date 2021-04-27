import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { Colours, size } from "../Components/Global/global.styles";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  text-align: center;
  margin: 0;
  padding: 0;
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


const Home = () => {
  let location = useLocation();
  const homeWrapper = useRef(null);


  return (
    <Layout>
      <HomeWrapper ref={homeWrapper}>
        <Link to={'/location'}> My house </Link>
        <Link to={'/ar'}> AR </Link>
        <Link to={'/real'}> Real </Link>
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
