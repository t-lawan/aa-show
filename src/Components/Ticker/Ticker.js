import React from 'react';
import styled from "styled-components";
import { size } from '../Global/global.styles';

const TickerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 7.5%;

  /* background: rgba(0, 255, 0, 0.6); */
  /* z-index: 100; */
  /* padding: 0.5rem; */
  @media (max-width: ${size.mobileL}) {
    /* font-size: 1.6vh; */
  /* font-size: 2.5vh; */
  height: 8.5%;


  }
`

const MarqueeWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  position: relative;

`

const TickerText = styled.p`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 12vh;
  text-align: center;
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  -moz-animation: scroll-left 2s linear infinite;
  -webkit-animation: scroll-left 2s linear infinite;
  animation: scroll-left 30s linear infinite;
  white-space: nowrap;
  font-size: 2vh;

  /* mix-blend-mode: saturation; */
`

const Ticker = () => {
    let creditText = "CREDITS: CURATOR MANIJEH VERGHESE, CONCEPT AND DESIGN: CREAM PROJECTS, WEB AND AR DEVELOPMENT: AKINSOLA LAWANSON AND TAMAS PALL"


    return (
        <TickerWrapper>
            <MarqueeWrapper>
                <TickerText> {"CREDITS: CONCEPT AND DESIGN: CREAM PROJECTS,   WEB AND AR DEVELOPMENT: AKINSOLA LAWANSON AND TAMAS PALL,   Base 3D Model: AccuCities,   3d Models: AA Students         ".toUpperCase()}</TickerText>
            </MarqueeWrapper>
        </TickerWrapper>
    )
}
export default Ticker;
