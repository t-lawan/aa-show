import * as React from "react";
import styled from "styled-components";
import { Colours, ZLayer } from "../../Global/global.styles";

const LoadingBarWrapper = styled.div`
  /* display: ${props => (props.show ? "flex" : "none")}; */
  padding: 0 1rem;
  display: flex;
  justify-content: center; 
  align-items: center;
  z-index: ${ZLayer.LOADING_PAGE};
  width: 100%;
  height: 1vh;
  /* border: 1px solid ${Colours.dark_grey}; */

`;
const LoadingWrapper = styled.div`
  width: 100%;
  height: 1vh;
  background: ${Colours.orange};
  border: 1px solid black;
`;
const LoadingProgressWrapper = styled.div`
  bottom: 0;
  width: ${props => props.percent};
  /* height: 100%; */
  height: 100%;

  background: black;
`;
const LoadingBar = (props) => {
  let percent = 0;
  if (props.loaded && props.total) {
    percent = Math.round((props.loaded / props.total) * 100);
  }
  return (
    <LoadingBarWrapper show={props.show}>
      <LoadingWrapper>
        <LoadingProgressWrapper percent={`${percent}%`} />
      </LoadingWrapper>
    </LoadingBarWrapper>
  );
};

export default LoadingBar;
