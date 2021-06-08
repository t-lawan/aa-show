import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Colours } from "../Global/global.styles";

const SidebarWrapper = styled.div`
  display: ${props => props => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 0;
  width: 15%;
  height: 100%;
  right: left;
  /* background: ${Colours.light_green_translucent}; */
  z-index: 100;
  padding: 2vh 2vw;
  overflow-y: scroll;
`;

const SidebarTitle = styled.p`
  font-size: 1vw;
  opacity: ${props => (props.canClick ? 1 : 0.4)};
  margin: 0;
  margin-bottom: 0.75vh;
`;
const Sidebar = props => {
  let projects = props.projects;
  let pageInfo = props.pageInfo;
  console.log("PAGE", pageInfo);
  return (
    <SidebarWrapper show={props.show}>
      {pageInfo ? (
        <React.Fragment>
          {pageInfo.defaultProjects.map((project, index) => (
            <SidebarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {" "}
              {project.sidebarTitle}
            </SidebarTitle>
          ))}
          <SidebarTitle canClick={true}> Experimental </SidebarTitle>
          {pageInfo.experimental.map((project, index) => (
            <SidebarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {" "}
              {project.sidebarTitle}
            </SidebarTitle>
          ))}
          <SidebarTitle canClick={true}> Diploma </SidebarTitle>

          {pageInfo.diploma.map((project, index) => (
            <SidebarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {" "}
              {project.sidebarTitle}
            </SidebarTitle>
          ))}
        </React.Fragment>
      ) : null}

      {/* {projects.map((project, index) => (
              <SidebarTitle canClick={project.shouldDisplay} onClick={() => props.onClick(project)} key={index}> {project.title}</SidebarTitle>
            ))} */}
    </SidebarWrapper>
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
)(Sidebar);
