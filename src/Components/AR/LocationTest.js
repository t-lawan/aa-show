import React, {useState}  from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import THREE from "three";
import Bear from "../../Assets/Models/Bear.glb";
const LocationTestWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  border: 1vw solid green;
`;

const OverlayWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 10%;
  background: red;
`
const LocationTest = () => {
  let show = true;
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  }
  return (
    <LocationTestWrapper onClick={onClick} onTouchEnd={onClick}>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; videoTexture: false;debugUIEnabled: false;"
      >
        {/* <a-assets>
          <a-asset-item id={"bear"} src={Bear}></a-asset-item>
        </a-assets> */}
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
        {/* <a-entity
          look-at="[gps-camera]"
          animation-mixer="loop: repeat"
          gltf-model="#bear"
          scale="0.1 0.1 0.1"
          gps-entity-place="latitude: 51.0597; longitude: -0.7171"
        ></a-entity> */}
        {/* <a-box material="color: yellow" scale="200 200 200" gps-entity-place='latitude: 51.483271; longitude: -0.027009' position="0 1 0"/> */}
      </a-scene>
      <OverlayWrapper>
        <p> {count} strawberries</p>
      </OverlayWrapper>
    </LocationTestWrapper>
  );
};
export default LocationTest;
