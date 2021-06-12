import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Colours, size } from "../Global/global.styles";

const NavbarWrapper = styled.div`
  position: absolute;
  display: none;
  bottom: 0;
  width: 100%;
  /* height: 15%; */
  right: 0;
  /* background: ${Colours.light_green_translucent}; */
  z-index: 100;
  padding: 2vh 4vw;
  overflow-y: scroll;
  @media (max-width: ${size.tablet}) {
      width: 2.5px;
      height: 1vh;
      display: block;
    }
  ::-webkit-scrollbar {
    width: 5px;
    height: 1vh;
    @media (max-width: ${size.tablet}) {
      width: 2.5px;
      height: 1vh;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavbarTitle = styled.p`
  font-size: 1.2vh;
  font-size: 2vh;
  opacity: ${props => (props.canClick ? 1 : 0.4)};
  margin: 0;
  /* margin-bottom: 0.75vh; */
  padding: 0 1vw;
`;
const Navbar = props => {
  let pageInfo = props.pageInfo;
  // console.log("PAGE", pageInfo);
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
              {project.sidebarTitle}
            </NavbarTitle>
          ))}
          {/* <NavbarTitle canClick={false}> Experimental </NavbarTitle> */}
          {pageInfo.experimental.map((project, index) => (
            <NavbarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {" "}
              Exp. {project.sidebarTitle}
            </NavbarTitle>
          ))}
          {/* <NavbarTitle canClick={false}> Diploma </NavbarTitle> */}

          {pageInfo.diploma.map((project, index) => (
            <NavbarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {" "}
              Dip. {project.sidebarTitle}
            </NavbarTitle>
          ))}

          <React.Fragment>
            {pageInfo.rightColumnProjects.map((project, index) => (
              <NavbarTitle
                canClick={project.shouldDisplay}
                onClick={() => props.onClick(project)}
                key={index}
              >
                {project.sidebarTitle}
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
