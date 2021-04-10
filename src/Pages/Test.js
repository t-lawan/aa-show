import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { Colours, size } from "../Components/Global/global.styles";
import { useLocation } from "react-router-dom";
import TestEnvironment from "../Components/Environment/TestEnvironment";

const TestWrapper = styled.div``;

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


const Test = () => {
  let location = useLocation();
  const homeWrapper = useRef(null);


  return (
    <Layout>
      <TestWrapper ref={homeWrapper}>
        <TestEnvironment />
      </TestWrapper>
    </Layout>
  );
};

export default Test;
