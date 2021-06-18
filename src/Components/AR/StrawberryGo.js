import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { connect } from "react-redux";
import styled from "styled-components";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
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

  //   useEffect(() => {
  //     const getProjects = async () => {
  //       projects = await RequestManager.getProjects();
  //       projects = projects.filter(project => {
  //         return project.showInArAtHome == true;
  //       });

  //       setSavedProjects(projects);

  //       if (projects) {
  //         setHasFetchedProjects(true); //set login state to true
  //         // randomlySelectProject()
  //       }
  //     };
  //     if (projects.length === 0) {
  //       getProjects();
  //     }
  //   }, []); //<-- run once when component mounted

  console.log("PROJECTS", projects);
  return (
    <StrawberryGoWrapper>
      <StyledMapContainer
        center={[51.505, -0.09]}
        zoom={startZoom}
        scrollWheelZoom={false}
      >
        {/* <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </StyledMapContainer>
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
