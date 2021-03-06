import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { Colours, size } from "../Components/Global/global.styles";
import { useLocation } from "react-router-dom";
import StrawberryGo from "../Components/AR/StrawberryGo";
import ARIframe from "../Components/AR/ARIframe";

const ARBedfordSquareWrapper = styled.div``;

const ARBedfordSquare = () => {
  let location = useLocation();


  return (
    <Layout>
      <ARBedfordSquareWrapper>
        {/* <StrawberryGo /> */}
        <ARIframe />
      </ARBedfordSquareWrapper>
    </Layout>
  );
};

export default ARBedfordSquare;
