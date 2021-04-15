import React from "react";
import styled from "styled-components";
import THREE from 'three'

const LocationTestWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const LocationTest = () => {

  return (
    <LocationTestWrapper>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-text
          value="This content will always face you."
          look-at="[gps-camera]"
          scale="120 120 120"
          gps-entity-place="latitude: 51.48327653033164; longitude: -0.027001553437656145;"
        ></a-text>
        <a-camera gps-camera rotation-reader>
          {" "}
        </a-camera>
      </a-scene>
    </LocationTestWrapper>
  );
};
export default LocationTest;
