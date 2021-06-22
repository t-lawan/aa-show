import React, {useState}  from "react";
import styled from "styled-components";


const StyledIframe = styled.iframe`
    width: 100vw;
    height: 100vh;
`


const ARIframe = (props) => {

    return (
        <StyledIframe src={'https://aa-ar.netlify.app/'} />
    )
}

export default ARIframe;


