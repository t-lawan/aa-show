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
        arjs="sourceType: webcam; videoTexture: true;debugUIEnabled: false;"
      >
        <a-text
          value="This content will always face you."
          look-at="[gps-camera]"
          scale="120 120 120"
          gps-entity-place="latitude: 51.48330276687647; longitude: -0.026756429050875434;"
        ></a-text>
        <a-box material="color: yellow" gps-entity-place="latitude: 51.48330276687647; longitude: -0.026756429050875434"/>
        <a-camera gps-camera rotation-reader>
          {" "}
        </a-camera>
      </a-scene>
      {/* <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.05 0.05 0.05"
          gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene> */}
    </LocationTestWrapper>
  );
};
export default LocationTest;
