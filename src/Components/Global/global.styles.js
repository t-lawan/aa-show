import styled, { createGlobalStyle } from "styled-components";
import NHaasGroteskDSPro from "../../Assets/Fonts/NHaasGroteskDSPro-55Rg.ttf";
import TypeWriterRegular from "../../Assets/Fonts/Typewriter_Regular_PRO.otf";
import TypeWriterRegularItalic from "../../Assets/Fonts/Typewriter_Regular_Italic_PRO.otf";
import Strawberry from '../../Assets/Images/strawberry.png'
export const size = {
  mobileS: "320px",
  mobileM: "420px",
  mobileL: "520px",
  mobileSL: "568px",
  mobileXL: "736px",
  tablet: "768px",
  tabletL: "1023px",
  laptop: "1024px",
  laptopM: "1124px",
  laptopL: "1400px",
  desktopS: "1600px",
  desktopM: "1900px",
  desktop: "2260px"
};
export const ZLayer = {
  LOADING_PAGE: 200,
  THREE_JS: 50,
  MODEL_VIEWER: 50,
  MODEL_VIEWER_LINKS: 100,
  NAVBAR: 75,
  OVERLAY: 80,
  INSTRUCTIONS: 110
}
export const Colours = {
  purple: "#a841f4",
  yellow: "#E4EE3F",
  grey: "#cac6ce",
  dark_grey: "	#707070",
  environment_background: "#BABAB8",
  snot_green: '#deeac5',
  background: '#d4d0d8',
  light_black: 'rbga(0,0,0,0.1)',
  light_blue: 'rgb(116, 251, 253)',
  light_green: 'rgb(116, 251, 253)',
  light_green_translucent: 'rgba(116,251,253, 0.2)',
  orange: '#e76a00'
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'TypeWriterRegular';
    src: url(${TypeWriterRegular}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'TypeWriterRegular';
    src: url(${TypeWriterRegularItalic}) format('truetype');
    font-weight: normal;
    font-style: italic;
  }
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    ::-webkit-scrollbar {
    width: 10px;
    @media (max-width: ${size.tablet}) {
      width: 7px;
    }
    overflow-y: hidden;

  }
  ::-webkit-scrollbar-thumb {
    background: white;
  }
    }

html, body {
  margin: 0;
  overflow: hidden;
  font-family:'TypeWriterRegular';
  cursor: url(${Strawberry}) 15 15, auto;
  ${'' /* cursor: crosshair; */}
  ${'' /* background: ${Colours.grey}; */}
  width: 100%;
  -webkit-font-smoothing: antialiased;
}

.leaflet-container {
  width: 100%;
  height: 100vh;
}


h1,h2,h3,h4,h5,h6 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    font-weight: 100;
    color: black;
    }
  a {
    text-decoration: underline;
    color: black;
    font-weight: 100 !important;
  }
  h1 {
  margin-bottom: 1.45rem;
  font-size: 2.5rem;
  line-height: 1.1;
  @media (max-width: ${size.tabletL}) {
    font-size: 2rem;

  }
}
h2 {
  margin-bottom: 1.45rem;
  font-size: 1.62671rem;
  line-height: 1.1;
}
h3 {
  margin-bottom: 1.45rem;
  font-size: 1.38316rem;
  line-height: 1.1;
}
h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  line-height: 1.1;
  word-break: break-all; 
}
h5 {
  margin-bottom: 1.45rem;
  font-size: 0.85028rem;
  line-height: 1.1;
}
h6 {
  margin-bottom: 1.45rem;
  font-size: 0.78405rem;
}
img {
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
}
p, li, a, span{
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  font-size: 1.9rem;
  letter-spacing: 0.03em;
  line-height: 1.05em;
  ${'' /* font-weight: 100 !important; */}
  color: 'black';
  @media (max-width: ${size.mobileXL}) {
    font-size: 1.1rem;
  }
}


@keyframes popup {
  0%{
    opacity: 0;
    transform: scale(0);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scroll-left {
            0% {
                -moz-transform: translateX(100%);
                -webkit-transform: translateX(100%);
                transform: translateX(100%);
            }
            100% {
                -moz-transform: translateX(-100%);
                -webkit-transform: translateX(-100%);
                transform: translateX(-100%);
            }
        }

@keyframes myAnim {
    0% {
      animation-timing-function: ease-in;
      opacity: 0;
      transform: translateY(0) scale(1);
    }
    15%{
      opacity: 1;
    }
    50%{
      opacity: 1;
    }
  
    100% {
      animation-timing-function: ease-out;
      transform: translateY(-50vh) scale(0);
      opacity: 0;
    }
  }


`;

export const TwoColumnSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  /* grid-column-gap: 1rem; */
  height: 100vh;
`;
