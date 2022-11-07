import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
// import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import useSupercluster from "use-supercluster";
import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../reducers/userSlice";
import image from "../../assets/logo/map-marker_hfipes.png";
import Popup from "../../components/Popup";

const Marker = ({ children }) => children;

export default function Monitor() {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const auth = useSelector((state) => state.userSlice.user);
  const [points, setPoints] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [modalShow, setModalShow] = useState(false);
  const changeIntervalRef = useRef(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
      return;
    }
    axios
      .get(
        `${REACT_APP_API_ENDPOINT}/api/devices?status=${1}&page=1&itemsPerPage=100`,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      )
      .then((data) => {
        const d = data.data["hydra:member"];
        if (d.length !== 0) {
          setPoints(
            d.map((crime) => ({
              type: "Feature",
              properties: {
                cluster: false,
                crimeId: crime.id,
                category: crime.type,
                detail: crime,
              },
              geometry: {
                type: "Point",
                coordinates: [
                  parseFloat(
                    crime.trackers[crime.trackers.length - 1].longitude
                  ),
                  parseFloat(
                    crime.trackers[crime.trackers.length - 1].latitude
                  ),
                ],
              },
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
    changeIntervalRef.current = setInterval(() => {
      axios
        .get(
          `${REACT_APP_API_ENDPOINT}/api/getAllDevices`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        )
        .then((data) => {
          const d = data.data["hydra:member"];
          console.log(d);
          if (d.length !== 0) {
            setPoints(
              d.map((crime) => ({
                type: "Feature",
                properties: {
                  cluster: false,
                  crimeId: crime.id,
                  category: crime.type,
                  detail: crime,
                },
                geometry: {
                  type: "Point",
                  coordinates: [
                    parseFloat(
                      crime.trackers[crime.trackers.length - 1].longitude
                    ),
                    parseFloat(
                      crime.trackers[crime.trackers.length - 1].latitude
                    ),
                  ],
                },
              }))
            );
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          }
        });
    }, 10000);
    return () => {
      clearInterval(changeIntervalRef.current);
    };
  }, [REACT_APP_API_ENDPOINT, auth, dispatch, navigate]);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCvCtL1aehcDaR6MxMUwGBx20uxYVEUshQ" }}
        defaultCenter={{ lat: 15, lng: 15 }}
        defaultZoom={1}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${20 + (pointCount / points.length) * 20}px`,
                    height: `${20 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.crimeId}`}
              lat={latitude}
              lng={longitude}
            >
              <button
                className="crime-marker"
                onClick={() => {
                  setInfo(cluster.properties.detail);
                  setModalShow(true);
                }}
              >
                <img src={image} alt="device" />
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>
      <Popup
        detail={info}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
