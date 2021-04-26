import React from "react";
import styled from "styled-components";
import THREE from 'three'
import Scene from '../../Assets/Models/scene.gltf'
const LocationTestWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const LocationTest = () => {
  let show = true;
  return (
    <LocationTestWrapper>

    {show ? (
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; videoTexture: false;debugUIEnabled: false;"
      >
        <a-camera gps-camera='simulateLatitude: 51.049; simulateLongitude: -0.723' rotation-reader ></a-camera>
        {/* <a-camera gps-camera rotation-reader ></a-camera> */}
        <a-text
          value="This content will always face you."
          look-at="[gps-camera]"
          scale="100 100 100"
          gps-entity-place='latitude: 51.0597; longitude: -0.7171'
        ></a-text>
        {/* <a-text
          value="This content will always face you."
          look-at="[gps-camera]"
          scale="100 100 100"
          gps-entity-place='latitude: 51.483271; longitude: -0.027009'
        ></a-text> */}
        <a-box material="color: yellow" scale="200 200 200" gps-entity-place='latitude: 51.0597; longitude: -0.7171' position="0 1 0"/>
        {/* <a-box material="color: yellow" scale="200 200 200" gps-entity-place='latitude: 51.483271; longitude: -0.027009' position="0 1 0"/> */}

      </a-scene>
    ) : (
      <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          // scale="0.05 0.05 0.05"
          scale="0.5 0.5 0.5"
          // gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
          gltf-model={Scene}
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
    
    )}
    </LocationTestWrapper>

  );
};
export default LocationTest;
