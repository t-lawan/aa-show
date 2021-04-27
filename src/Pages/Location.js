import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Geolocation from "../Components/AR/Geolocation";

const LocationWrapper = styled.div``;

const Location = () => {
  let location = useLocation();
  const homeWrapper = useRef(null);


  return (
    <Layout>
      <LocationWrapper ref={homeWrapper}>
        <Geolocation />
      </LocationWrapper>
    </Layout>
  );
};

export default Location;
