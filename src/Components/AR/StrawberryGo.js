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
import { Colours, ZLayer } from "../Global/global.styles";
import UserMarker from "../../Assets/Images/user.png";
import LocationModal from "./LocationModal";
import { element } from "prop-types";
import StrawberryImage from '../../Assets/Images/strawberry.png'

const StrawberryGoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const StyledMapContainer = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
  z-index: 50;
`;

const StrawberryImageWrapper = styled.div`
  /* background: red; */
  width: 20vw;
  height: 10vh;
  position: absolute;
  top: 1vh;
  right: 1vw;
  z-index: ${ZLayer.MODEL_VIEWER_LINKS};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const StrawberryImageEl = styled.img`
margin: 0;
padding: 0;
width: 50%;

`
function Location(props) {
  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: location => {
      props.getLocation(location);
    }
  });
  return null;
}

class StrawberryGo extends React.Component {
  mapRef;
  startMapCenter = [51.51895683571971, -0.13002140453811567];
  startZoom = 19;
  maxDistance = 7;
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
    this.watchLocation();
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
    this.getLocation(location.coords);
    this.filterContent(location.coords);
    // filterContentByDistance(lat, lon)
  }
  handleLocationError(location) {

    // this.getLocation(location);
    // filterContentByDistance(lat, lon)
  }

  filterContent(location){
    let projects = this.state.projects;
    projects.forEach((project, index) => {
      let dist = this.getDistance(location.latitude, location.longitude, project.worldCoordinates.lat, project.worldCoordinates.lon)
      if(dist < this.maxDistance) {
        // CHANGE COLOR
        project.inProximity = true;
        if(!project.collected) {
          project.viewed = true;
        }
      } else {
        project.inProximity = false;
      }
    })
  }

  getLocation = location => {
    // map.locate();
    this.setState({
      userLocation: [location.latitude, location.longitude],
      userRadius: location.accuracy
    });
  };

  getDistance(lat1, lon1, lat2, lon2) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    }
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d;
  }

  selectProject = project => {
    project.viewed = true;
    // this.getLocation()
    this.setState({
      showModal: true,
      currentProject: project
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      currentProject: null
    });
  };


  updateProjects = (project) => {
    let projects = this.state.projects;
    let index = projects.findIndex((pr) => {
      return pr.id = project.id;
    })
    if(index) {
      projects[index] = project;
    }
    return projects;
  }
  collectedItem = (project) => {
    // Update Project
    project.collected = true;

    // Find Project
    // let projects = this.state.projects;
    // let index = projects.findIndex((pr) => {
    //   return pr.id = project.id;
    // })
    // if(index) {
    //   projects[index] = project;
    // }

    let projects = this.updateProjects(project)


    this.setState({
      numOfStrawberries: this.state.numOfStrawberries + 1,
      projects: projects
    });
  };
  render() {
    return (
      <StrawberryGoWrapper>
        <LocationModal
          show={this.state.showModal}
          project={this.state.currentProject}
          onClose={this.onCloseModal.bind(this)}
          collectedItem={this.collectedItem.bind(this)}
        />

        <StrawberryImageWrapper>
          {this.state.numOfStrawberries}
          <StrawberryImageEl src={StrawberryImage} />
        </StrawberryImageWrapper>
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
                pathOptions={{ color: project.collected ? Colours.orange: Colours.light_blue }}
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
                pathOptions={{ color: project.collected ? Colours.orange: Colours.light_blue }}
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
