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
    lat: "51.483456",
    lon: "-0.028074"
  }
];
const Geolocation = () => {
  return (
    <GeolocationWrapper>
      <a-scene
        renderer="logarithmicDepthBuffer: true;"
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >

        {locations.map((loc, index) => (
          <React.Fragment key={index}>
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
          </React.Fragment>
        ))}
        {/* <a-camera locationfinder gps-camera="gpsMinDistance: 1;alert:true;" rotation-reader></a-camera> */}
        <a-camera locationfinder gps-camera rotation-reader></a-camera>

      </a-scene>
    </GeolocationWrapper>
  );
};
export default Geolocation;
