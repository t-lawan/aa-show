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
    lat: "51.4829326",
    lon: "-0.00267869"
  },
  {
    lat: "51.4832709",
    lon: "-0.0268556"
  },
  {
    lat: "51.4828768",
    lon: "-0.00268593"
  },
  {
    lat: "51.4827793",
    lon: "-0.00268385"
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
        <a-camera locationfinder gps-camera="gpsMinDistance: 1;" rotation-reader></a-camera>

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
              material="color: yellow"
              scale="200 200 200"
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
