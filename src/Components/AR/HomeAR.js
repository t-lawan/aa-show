import React from "react";
import styled from "styled-components";

import Bear from "../../Assets/Models/Bear.glb";
import AstronautGLB from "../../Assets/Models/Astronaut.glb";
import AstronautUSDZ from "../../Assets/Models/Astronaut.usdz";
import "@google/model-viewer";

const HomeARWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  model-viewer {
    width: 100%;
    height: 100%;
  }
`;

const ARButton = styled.p`
  color: green;
  background: red;
  border-radius: 4px;
  border: none;
  position: absolute;
  top: 1vw;
  right: 1vw;
`

const HomeAR = () => {
  return (
    <HomeARWrapper>
      {/* <model-viewer src={Bear} ar ar-modes="webxr scene-viewer quick-look" camera-controls alt="Bear" ar-placement="floor" /> */}
      <model-viewer
        src={AstronautGLB}
        ios-src={AstronautUSDZ}
        ar
        camera-controls
        alt="Bear"
        ar-placement="floor"
      >
        <ARButton
          slot="ar-button"
        //   style="background-color: white; border-radius: 4px; border: none; position: absolute; top: 16px; right: 16px; "
        >
          👋 Activate AR
        </ARButton>
      </model-viewer>
    </HomeARWrapper>
  );
};

export default HomeAR;
