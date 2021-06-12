import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Colours, size } from "../Global/global.styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "../../Utility/Richtext";


const OverlayWrapper = styled.div`
  display: ${props => props => props.show ? 'block' : 'none'};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  right: 0;
  background: ${Colours.light_green_translucent};
`

const ProjectTitle = styled.h1`
    color: ${Colours.light_green};
    font-size: 10vh;
    @media (max-width: ${size.tablet}) {
    font-size: 10vw;

    }
`

const ProjectDescription = styled.p`

`

const ARLink = styled(Link)`

`

const ProjectContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1vh 0.5vw;
    justify-content: center;
    align-items:center;
    height: 100%;
    color: ${Colours.light_green}
`
const Overlay = (props) => {
    let project = props.selected_ar_project;
    return (
      <OverlayWrapper onClick={props.onClick} show={props.show}>
        {project ? (
            <ProjectContentWrapper>
                <ProjectTitle> {project.title} </ProjectTitle>
                {/* {documentToReactComponents(project.description, richTextOptions)} */}
                {/* <ARLink to={"/ar-at-home"} > Totem Link </ARLink> */}
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
  