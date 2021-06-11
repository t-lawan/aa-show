import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Colours } from "../Global/global.styles";

const RightSidebarWrapper = styled.div`
  display: ${props => props => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 0;
  width: 15%;
  height: 100%;
  right: 0;
  /* background: ${Colours.light_green_translucent}; */
  z-index: 100;
  padding: 2vh 2vw;
  overflow-y: scroll;
`;

const SidebarTitle = styled.p`
  font-size: 1.2vh;
  opacity: ${props => (props.canClick ? 1 : 0.4)};
  margin: 0;
  margin-bottom: 0.75vh;
`;
const RightSidebar = props => {
  let pageInfo = props.pageInfo;
  // console.log("PAGE", pageInfo);
  return (
    <RightSidebarWrapper show={props.show}>
      {pageInfo ? (
        <React.Fragment>
          {pageInfo.rightColumnProjects.map((project, index) => (
            <SidebarTitle
              canClick={project.shouldDisplay}
              onClick={() => props.onClick(project)}
              key={index}
            >
              {project.sidebarTitle}
            </SidebarTitle>
          ))}
          </React.Fragment>
      ) : null}
    </RightSidebarWrapper>
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
)(RightSidebar);
