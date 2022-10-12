/* global google */
import React, { Component } from "react";
import Moment from "react-moment";
import Map from "./Map";
import "./geo.css";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { logout } from "../../reducers/userSlice";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyCvCtL1aehcDaR6MxMUwGBx20uxYVEUshQ`;
const { REACT_APP_API_ENDPOINT } = process.env;

class GeofenceDevice extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      intervalId: 0,
      // center: {
      //   // CN Tower default
      //   lat: 43.642558,
      //   lng: -79.387046,
      // },
      content: "Getting position...",
      insideFence: false,
      previousPolygon: null,
      fence: null,
      watchID: null,
      lastFetched: null,
    };

    const { id } = this.props.params;
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/devices/${id}`, {
        headers: {
          Authorization: "Bearer " + this.props.user.token,
        },
      })
      .then((data) => {
        this.setState({
          center: {
            lat: parseFloat(
              data.data.trackers[data.data.trackers.length - 1].latitude
            ),
            lng: parseFloat(
              data.data.trackers[data.data.trackers.length - 1].longitude
            ),
          },
          content: `Location found.`,
          lastFetched: 1,
        });
        this.checkGeofence();
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          // logout();
          // this.props.navigation.navigate("/login");
        }
      });
  }

  componentDidMount() {
    this.myRef.current = setInterval(() => {
      const { id } = this.props.params;
      axios
        .get(`${REACT_APP_API_ENDPOINT}/api/devices/${id}`, {
          headers: {
            Authorization: "Bearer " + this.props.user.token,
          },
        })
        .then((data) => {
          this.setState({
            center: {
              lat: parseFloat(
                data.data.trackers[data.data.trackers.length - 1].latitude
              ),
              lng: parseFloat(
                data.data.trackers[data.data.trackers.length - 1].longitude
              ),
            },
            content: `Location found.`,
            lastFetched: 1,
          });
          this.checkGeofence();
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 401) {
            // logout();
            // this.props.navigation.navigate("/login");
          }
        });
    }, 10000);
    this.checkGeofence();
  }

  componentWillUnmount() {
    clearInterval(this.myRef.current);
    this.unwatchLocation();
  }

  watchLocation() {
    if ("geolocation" in navigator) {
      const geoOptions = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 1000,
      };

      navigator.geolocation.watchPosition(
        this.getLocation.bind(this),
        null,
        geoOptions
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  unwatchLocation() {
    if ("geolocation" in navigator && this.state.watchID) {
      navigator.geolocation.clearWatch(this.state.watchID);
    }
  }

  getLocation(position) {
    this.setState({
      center: {
        // CN Tower default
        lat: 43.642558,
        lng: -79.387046,
      },
      content: `Location found.`,
      lastFetched: position.timestamp,
    });

    this.checkGeofence();
  }

  checkGeofence() {
    if (!this.state.fence) {
      this.setState({
        insideFence: false,
      });
      return;
    }

    const insideFence = google.maps.geometry.poly.containsLocation(
      {
        lat: this.state.center.lat,
        lng: this.state.center.lng,
      },
      this.state.fence
    );

    this.setState({
      insideFence,
    });
  }

  doneDrawing(polygon) {
    if (this.state.previousPolygon) {
      this.state.previousPolygon.setMap(null);
    }

    this.setState({ previousPolygon: polygon });

    this.setState({
      fence: new google.maps.Polygon({
        paths: polygon.getPaths(),
      }),
    });
    this.checkGeofence();
  }

  getCurrentPosition() {
    const currentPosition = {
      // CN Tower default
      lat: 43.642558,
      lng: -79.387046,
    };
    return currentPosition;
  }

  render() {
    let map = null;
    let fenceStatus = null;

    if (this.state.fence) {
      if (this.state.insideFence) {
        fenceStatus = <p>You are inside the fence.</p>;
      } else {
        fenceStatus = <p>You are outside the fence.</p>;
      }
      console.log(this.state.insideFence);
    }

    if (this.state.lastFetched) {
      map = (
        <div>
          <p>
            Last fetched:{" "}
            <Moment interval={1000} fromNow>
              {this.state.lastFetched}
            </Moment>
          </p>
          <Map
            googleMapURL={googleMapURL}
            loadingElement={<p>Loading maps...</p>}
            containerElement={<div className="map-container" />}
            mapElement={<div className="map" />}
            center={this.state.center}
            content={this.state.content}
            doneDrawing={this.doneDrawing.bind(this)}
          />
        </div>
      );
    } else {
      map = <p>Getting location...</p>;
    }

    return (
      <div className="App">
        {map}
        {fenceStatus}
      </div>
    );
  }
}

export default withParams(GeofenceDevice);
