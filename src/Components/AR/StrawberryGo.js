import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvent,
  useMapEvents,
  MapConsumer
} from "react-leaflet";
import { connect } from "react-redux";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import RequestManager from "../../Utility/Managers/RequestManager";
import { Colours } from "../Global/global.styles";
import UserMarker from "../../Assets/Images/user.png";
import LocationModal from "./LocationModal";

const StrawberryGoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const StyledMapContainer = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
  z-index: 50;
`;

function Location(props) {
  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: location => {
      props.getLocation(location);
      console.log("location found:", location);
    }
  });
  return null;
}

class StrawberryGo extends React.Component {
  mapRef;
  startMapCenter = [51.51895683571971, -0.13002140453811567];
  startZoom = 19;
  maxDistance = 5;
  watchPositionId = null;
  constructor(props) {
    super(props);
    this.state = {
      hasFetchedProjects: false,
      userLocation: [0, 0],
      projects: [],
      userRadius: 50,
      numOfStrawberries: 0,
      showModal: false,
      currentProject: null
    };
    this.mapRef = React.createRef();
  }

  async componentDidMount() {
    await this.getProjects();
    this.watchLocation()
    // setTimeout(() => {
    //   this.getLocation()

    // }, 500)
  }

  getProjects = async () => {
    let projects = await RequestManager.getProjects();
    projects = projects.filter(project => {
      return project.showInArAtHome == true;
    });

    this.setState({
      projects: projects,
      hasFetchedProjects: true
    });
  };

  watchLocation = () => {
    if (navigator.geolocation) {
      console.log('HI')
      this.watchPositionId = navigator.geolocation.watchPosition(
        this.handleLocationSuccess.bind(this),
        this.handleLocationError.bind(this),
        {
          enableHighAccuracy: true,
          maximumAge: Infinity,
          timeout: 1000
        }
      );
    }
  };

  handleLocationSuccess(location) {
    console.log('handleLocationSuccess', location)
    this.getLocation(location.coords);
    // filterContentByDistance(lat, lon)
  }
  handleLocationError(location) {
    console.log('handleLocationError', location)

    // this.getLocation(location);
    // filterContentByDistance(lat, lon)
  }

  getLocation = location => {
    // map.locate();
    this.setState({
      userLocation: [location.latitude, location.longitude],
      userRadius: location.accuracy
    });
  };

  selectProject = project => {
    console.log("xxx", project);
    // this.getLocation()
    this.setState({
      showModal: true,
      currentProject: project
    })
  };

  onCloseModal = () => {
    console.log('HEY')
    this.setState({
      showModal: false,
      currentProject: null
    })
  }

  collectedItem = () => {
    this.setState({
      numOfStrawberries: this.state.numOfStrawberries + 1
    })
  }
  render() {
    return (
      <StrawberryGoWrapper>
        <LocationModal show={this.state.showModal} project={this.state.currentProject} onClose={this.onCloseModal.bind(this)}  collectedItem={this.collectedItem.bind(this)} />
        {/* {this.state.hasFetchedProjects ? ( */}
        <StyledMapContainer
          center={this.startMapCenter}
          zoom={this.startZoom}
          scrollWheelZoom={false}
          ref={this.mapRef}
        >
          <TileLayer
            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            maxZoom={20}
          />
          {/* <Location getLocation={this.getLocation.bind(this)} /> */}
          {/* <Marker position={this.state.userLocation}> */}
          <Circle
            center={this.state.userLocation}
            radius={this.state.userRadius}
            pathOptions={{
              color: Colours.orange,
              fill: true,
              fillOpacity: 0.3
            }}
          />
          {/* </Marker> */}

          {this.state.projects.map((project, index) => (
            <React.Fragment key={index}>
              {/* Outer Circle */}
              <Circle
                center={[
                  project.worldCoordinates.lat,
                  project.worldCoordinates.lon
                ]}
                radius={this.maxDistance}
                pathOptions={{ color: Colours.light_green }}
                eventHandlers={{
                  click: () => {
                    this.selectProject(project);
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
        {/* ) : null} */}
      </StrawberryGoWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected_ar_project: state.selected_ar_project
  };
};

export default connect(
  mapStateToProps,
  null
)(StrawberryGo);
