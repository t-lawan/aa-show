import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import HomeAR from "../Components/AR/HomeAR";

const ModelViewerExampleWrapper = styled.div``;

const ModelViewerExample = () => {
  let location = useLocation();
//   const homeWrapper = useRef(null);


  return (
    <Layout>
      <ModelViewerExampleWrapper>
        <HomeAR />
      </ModelViewerExampleWrapper>
    </Layout>
  );
};

export default ModelViewerExample;
