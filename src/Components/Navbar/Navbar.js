import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Colours, size, ZLayer } from "../Global/global.styles";


const NavbarWrapper = styled.div`
  position: absolute;
  display: none;
  top: 0;
  width: 100%;
  /* height: 15%; */
  right: 0;
  /* background: ${Colours.light_green_translucent}; */
  z-index: ${ZLayer.NAVBAR};
  padding: 2vh 4vw;
  overflow-y: scroll;
  display: ${props => (props.show ? "block" : "none")};

  @media (max-width: ${size.mobileL}) {
      display: ${props => (props.show ? "block" : "none")};
    }
  ::-webkit-scrollbar {
    width: 5px;
    height: 1vh;
    /* display:none; */
    cursor: crosshair !important;

    @media (max-width: ${size.mobileL}) {
      width: 2.5px;
      height: 0.5vh;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavbarSection = styled.p`
  font-size: 3vh;
  color: white;
  padding: 0 1vw;
  margin: 0;
  white-space: nowrap;


`
const NavbarTitle = styled(NavbarSection)`
  color: black;
  opacity: ${props => (props.canClick ? 1 : 0.4)};
  white-space: nowrap;
  /* color: ${props => (props.canClick ? 'black' : Colours.orange)}; */
`;


const Navbar = props => {
  let pageInfo = props.pageInfo;
  return (
    <NavbarWrapper show={props.show}>
      {pageInfo ? (
        <ContentWrapper>
          {pageInfo.defaultProjects.map((project, index) => (
            <NavbarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {" "}
              {project.sidebarTitle.toUpperCase()}
            </NavbarTitle>
          ))}
          <NavbarSection> {'Experimental'.toUpperCase()} </NavbarSection>
          {pageInfo.experimental.map((project, index) => (
            <NavbarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {" "}
              {project.sidebarTitle.toUpperCase()}
            </NavbarTitle>
          ))}
          {/* <NavbarTitle canClick={false}> Diploma </NavbarTitle> */}
          <NavbarSection> {'Diploma'.toUpperCase()} </NavbarSection>

          {pageInfo.diploma.map((project, index) => (
            <NavbarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {" "}
              {project.sidebarTitle.toUpperCase()}
            </NavbarTitle>
          ))}

          <React.Fragment>
            {pageInfo.rightColumnProjects.map((project, index) => (
              <NavbarTitle
                canClick={project.shouldDisplay}
                onClick={() => props.onClick(project)}
                key={index}
              >
                {project.sidebarTitle.toUpperCase()}
              </NavbarTitle>
            ))}
          </React.Fragment>
        </ContentWrapper>
      ) : null}
    </NavbarWrapper>
  );
};

const mapStateToProps = state => {
  return {
    selected_ar_project: state.selected_ar_project
  };
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
