import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../reducers/userSlice";

const { REACT_APP_API_ENDPOINT } = process.env;

const Map = () => {
  const auth = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams()["id"];

  const [center, setCenter] = useState({
    lat: 18.559008,
    lng: -68.388881,
  });

  const [path, setPath] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/devices/${id}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then((data) => {
        setCenter({
          lat: parseFloat(
            data.data.trackers[data.data.trackers.length - 1].latitude
          ),
          lng: parseFloat(
            data.data.trackers[data.data.trackers.length - 1].longitude
          ),
        });
        console.log(data.data);
        data.data.trackers.forEach((element) => {
          setPath((prev) => [
            ...prev,
            {
              lat: parseFloat(element.latitude),
              lng: parseFloat(element.longitude),
            },
          ]);
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
  }, [setPath, auth, dispatch, navigate, id]);

  return (
    <GoogleMap defaultZoom={10} center={{ lat: center.lat, lng: center.lng }}>
      {path.length > 0 && (
        <>
          <Marker
            label={{
              text: "start",
              color: "white",
              fontSize: "10px",
            }}
            position={{
              // CN Tower default
              lat: path[0].lat,
              lng: path[0].lng,
            }}
          />
          <Marker
            label={{
              text: "end",
              color: "white",
              fontSize: "10px",
            }}
            position={{
              // CN Tower default
              lat: path[path.length - 1].lat,
              lng: path[path.length - 1].lng,
            }}
          />
        </>
      )}

      {path.length > 0 && (
        <Polyline path={path} options={{ strokeColor: "#0000FF " }} />
      )}
    </GoogleMap>
  );
};

const MapComponent = withScriptjs(withGoogleMap(Map));

const Trace = () => (
  <MapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyCvCtL1aehcDaR6MxMUwGBx20uxYVEUshQ"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `80vh`, width: "100%" }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);

export default Trace;