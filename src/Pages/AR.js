import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { Colours, size } from "../Components/Global/global.styles";
import { useLocation } from "react-router-dom";
import StrawberryGo from "../Components/AR/StrawberryGo";

const TestWrapper = styled.div``;

const AR = () => {
  let location = useLocation();
  const homeWrapper = useRef(null);


  return (
    <Layout>
      <TestWrapper ref={homeWrapper}>
        <StrawberryGo />
      </TestWrapper>
    </Layout>
  );
};

export default AR;
