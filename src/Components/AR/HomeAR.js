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
            {/* <model-viewer src={Bear} ar ar-modes="webxr scene-viewer quick-look" camera-controls alt="Bear" ar-placement="floor" /> */}
            <model-viewer src={Bear} ar ar-modes="webxr" camera-controls alt="Bear" ar-placement="floor" />
        </HomeARWrapper>
    )
}

export default HomeAR;
