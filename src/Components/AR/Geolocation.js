import React from "react";
import styled from "styled-components";
import THREE from "three";
import Scene from "../../Assets/Models/scene.gltf";
const GeolocationWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Geolocation = () => {
  return (
    <GeolocationWrapper>
        <a-scene
          vr-mode-ui="enabled: false"
          embedded
          arjs="sourceType: webcam; videoTexture: false;debugUIEnabled: false;"
        >

          <a-camera locationfinder gps-camera rotation-reader ></a-camera>
          <a-text
          value="This content will always face you."
          look-at="[gps-camera]"
          scale="100 100 100"
          gps-entity-place='latitude: 51.4832779; longitude: -0.026898199999999997'
        ></a-text>
          <a-box
            material="color: yellow"
            scale="200 200 200"
            gps-entity-place="latitude: 51.4832779; longitude: -0.026898199999999997"
            position="0 1 0"
          />
        </a-scene>
    </GeolocationWrapper>
  );
};
export default Geolocation;
