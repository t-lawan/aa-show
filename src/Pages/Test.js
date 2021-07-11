import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { Colours, size } from "../Components/Global/global.styles";
import { useLocation } from "react-router-dom";
import TestEnvironment from "../Components/Environment/TestEnvironment";
import BedfordSquare from "../Components/Environment/BedfordSquare";

const TestWrapper = styled.div``;

export const Title = styled.p`
  text-align: center;
  margin: 0;
  padding: 0;
`;



const Test = () => {
  let location = useLocation();
  const homeWrapper = useRef(null);


  return (
    <Layout>
      <TestWrapper ref={homeWrapper}>
        <BedfordSquare />
      </TestWrapper>
    </Layout>
  );
};

export default Test;
