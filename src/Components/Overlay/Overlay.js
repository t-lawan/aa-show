import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const OverlayWrapper = styled.div`
  display: ${props => props => props.show ? 'block' : 'none'};
  position: absolute;
  bottom: 0;
  width: 50%;
  height: 30%;
  left: 0;
  background: red;
`

const ProjectTitle = styled.h1`

`

const ProjectDescription = styled.p`

`

const ARLink = styled(Link)`

`

const ProjectContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1vh 0.5vw;
`
const Overlay = (props) => {
    let project = props.selected_ar_project;
    return (
      <OverlayWrapper onClick={props.onClick} show={props.show}>
        {project ? (
            <ProjectContentWrapper>
                <ProjectTitle> {project.title} </ProjectTitle>
                <ProjectDescription> This is a description of {project.title} </ProjectDescription>
                <ARLink to={"/ar-at-home"} > Totem Link </ARLink>
            </ProjectContentWrapper>
        ) : null}
      </OverlayWrapper>
    );
  };
  
  const mapStateToProps = state => {
    return {
      selected_ar_project: state.selected_ar_project,
    };
  };
  

  
  export default connect(
    mapStateToProps,
    null
  )(Overlay);
  