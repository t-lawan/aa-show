import React from "react";
import styled from "styled-components";
import THREE from 'three'
import Scene from '../../Assets/Models/scene.gltf'
const LocationTestWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const LocationTest = () => {
  let show = false;
  return (
    <LocationTestWrapper>

    {show ? (
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; videoTexture: true;debugUIEnabled: false;"
      >
        <a-text
          value="This content will always face you."
          look-at="[gps-camera]"
          scale="120 120 120"
          gps-entity-place="latitude: 51.48319955619615; longitude: -0.027080548020672113;"
        ></a-text>
        <a-box material="color: yellow" gps-entity-place="latitude: 51.48319955619615; longitude: -0.027080548020672113"/>
        <a-camera gps-camera rotation-reader>
        {/* 51.48319955619615, -0.027080548020672113 */}
          {" "}
        </a-camera>
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
