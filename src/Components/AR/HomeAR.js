import React from "react";
import styled from "styled-components";

import Bear from "../../Assets/Models/Bear.glb";
import '@google/model-viewer'


const HomeARWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const HomeAR = () => {
    return (
        <HomeARWrapper>
            <p> Hi</p>
            <model-viewer src={Bear} ar ar-modes="webxr scene-viewer quick-look" camera-controls alt="A 3D model of an astronaut" ar-placement="floor" />
        </HomeARWrapper>
    )
}

export default HomeAR;
