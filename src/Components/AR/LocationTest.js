import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import THREE from "three";
import Scene from "../../Assets/Models/scene.gltf";
const LocationTestWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const LocationTest = () => {
  let show = true;
  return (
    <LocationTestWrapper>
        <a-scene
          vr-mode-ui="enabled: false"
          embedded
          arjs="sourceType: webcam; videoTexture: false;debugUIEnabled: false;"
        >
          <a-camera
            locationfinder
            gps-camera="simulateLatitude: 51.049; simulateLongitude: -0.723"
            rotation-reader
          ></a-camera>
          <a-text
            value="This content will always face you."
            look-at="[gps-camera]"
            scale="100 100 100"
            gps-entity-place="latitude: 51.0597; longitude: -0.7171"
          ></a-text>
          <a-box
            material="color: yellow"
            scale="200 200 200"
            gps-entity-place="latitude: 51.0597; longitude: -0.7171"
            position="0 1 0"
          />
          {/* <a-box material="color: yellow" scale="200 200 200" gps-entity-place='latitude: 51.483271; longitude: -0.027009' position="0 1 0"/> */}
        </a-scene>

    </LocationTestWrapper>
  );
};
export default LocationTest;
