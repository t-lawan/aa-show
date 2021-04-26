import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { Colours, size } from "../Components/Global/global.styles";
import { useLocation } from "react-router-dom";
import LocationTest from "../Components/AR/LocationTest";
import BedfordSquare from "../Components/Environment/BedfordSquare";

const RealWrapper = styled.div``;

const Real = () => {
  let location = useLocation();
//   const homeWrapper = useRef(null);


  return (
    <Layout>
      <RealWrapper>
        <BedfordSquare />
      </RealWrapper>
    </Layout>
  );
};

export default Real;
