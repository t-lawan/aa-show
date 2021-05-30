import React from "react";
import styled from "styled-components";
import THREE from "three";
import Scene from "../../Assets/Models/scene.gltf";
const GeolocationWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const locations = [
  {
    lat: "51.483330",
    lon: "-0.026910"
  },
  {
    lat: "51.483134",
    lon: "-0.026891"
  },
  {
    lat: "51.483388",
    lon: "-0.027267"
  },
  {
    lat: "51.483435",
    lon: "-0.028115"
  }
];
const Geolocation = () => {
  return (
    <GeolocationWrapper>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; videoTexture: false;debugUIEnabled: false;"
      >
        <a-camera locationfinder gps-camera="gpsMinDistance: 1;alert:true;" rotation-reader></a-camera>

        {locations.map((loc, index) => (
          <div key={index}>
            <a-text
              value="This content will always face you."
              look-at="[gps-camera]"
              scale="100 100 100"
              align="center"
              gps-entity-place={`latitude:${loc.lat};longitude:${loc.lon}`}
            ></a-text>
            <a-box
              material="color: red"
              scale="500 500 500"
              gps-entity-place={`latitude:${loc.lat};longitude:${loc.lon}`}
              // position="0 1 0"
            />
          </div>
        ))}
      </a-scene>
    </GeolocationWrapper>
  );
};
export default Geolocation;
