import * as React from "react";
import styled from "styled-components";
import LoadingBar from "../LoadingBar/LoadingBar";
import { size, ZLayer } from "../../Global/global.styles";

const LoadingPageWrapper = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: ${ZLayer.LOADING_PAGE};
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  @media (max-width: ${size.tabletL}) {
  }
`;

const LoadingBarWrapper = styled.div`
  width: 60%;
`;
const LoadingPage = props => {
  return (
    <LoadingPageWrapper show={props.show}>
      <ContentWrapper>
        <LoadingBarWrapper>
          <LoadingBar show={true} loaded={props.loaded} total={props.total} />
        </LoadingBarWrapper>
      </ContentWrapper>
    </LoadingPageWrapper>
  );
};

export default LoadingPage;
