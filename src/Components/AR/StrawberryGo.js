import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvent
} from "react-leaflet";
import { connect } from "react-redux";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import RequestManager from "../../Utility/Managers/RequestManager";
import { Colours } from "../Global/global.styles";
const StrawberryGoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const StyledMapContainer = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
`;
const StrawberryGo = props => {
  const [hasFetchedProjects, setHasFetchedProjects] = useState(false);

  const startMapCenter = [51.51895683571971, -0.13002140453811567];
  const startZoom = 19;
  const maxDistance = 5;

  let projects = [];
  const [title, setTitle] = useState("");
  const [savedProjects, setSavedProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      projects = await RequestManager.getProjects();
      projects = projects.filter(project => {
        return project.showInArAtHome == true;
      });

      setSavedProjects(projects);

      if (projects) {
        setHasFetchedProjects(true); //set login state to true
        // randomlySelectProject()
      }
    };

    if (projects.length === 0) {
      getProjects();
    }
  }, []); //<-- run once when component mounted

  const selectProject = project => {
    console.log("xxx", project);
  };

  return (
    <StrawberryGoWrapper>
      {hasFetchedProjects ? (
        <StyledMapContainer
          center={startMapCenter}
          zoom={startZoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            maxZoom={20}
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {savedProjects.map((project, index) => (
            <React.Fragment key={index}>
              {/* Outer Circle */}
              <Circle
                center={[
                  project.worldCoordinates.lat,
                  project.worldCoordinates.lon
                ]}
                radius={maxDistance}
                pathOptions={{ color: Colours.light_green }}
                eventHandlers={{
                  click: (projects) => {
                    selectProject(project)
                  }
                }}
                // onClick={project => }
              />
              {/* Inner Circle */}

              <Circle
                center={[
                  project.worldCoordinates.lat,
                  project.worldCoordinates.lon
                ]}
                radius={0.1}
                pathOptions={{ color: Colours.light_green }}
              />
            </React.Fragment>
          ))}
        </StyledMapContainer>
      ) : null}
    </StrawberryGoWrapper>
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
)(StrawberryGo);
