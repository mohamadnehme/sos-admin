import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { logout } from "../../reducers/userSlice";
import Button from "@mui/material/Button";
import GoogleMapReact from "google-map-react";
import image from "../../assets/logo/map-marker_hfipes.png";

const TrackDevice = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tracker, setTracker] = useState(null);

  const [pausedTimer, setPausedTimer] = useState(true);
  const [buttonLabel, setButtonLabel] = useState("Start");
  const changeIntervalRef = useRef(null);

  const id = useParams()["id"];

  const onStartStopClick = () => {
    updateButtonLabel();
    if (pausedTimer) {
      startDataChange();
      setPausedTimer(!pausedTimer);
    } else {
      pauseDataChange();
      setPausedTimer(!pausedTimer);
    }
  };
  const updateButtonLabel = () => {
    pausedTimer ? setButtonLabel("Stop") : setButtonLabel("Start");
  };

  const markerStyle = {
    height: "50px",
    width: "50px",
    marginTop: "-50px",
  };

  const imgStyle = {
    height: "100%",
  };

  const Marker = ({ title }) => (
    <div style={markerStyle}>
      <img style={imgStyle} src={image} alt={title} />
    </div>
  );

  const style = {
    maxWidth: "50%",
    height: "80vh",
    overflowX: "hidden",
    overflowY: "hidden",
    position: "relative",
  };
  const containerStyle = {
    position: "absolute",
    overflow: "hidden",
  };

  const startDataChange = () => {
    clearInterval(changeIntervalRef.current);
    changeIntervalRef.current = setInterval(() => {
      axios
        .get(`${REACT_APP_API_ENDPOINT}/api/devices/${id}`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((data) => {
          console.log(data.data.trackers[data.data.trackers.length - 1]);
          const track = data.data.trackers[data.data.trackers.length - 1];
          setTracker(track);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            pauseDataChange();
            dispatch(logout());
            navigate("/login");
          }
        });
    }, 10000);
  };

  // Pauses the data being updated
  const pauseDataChange = () => {
    clearInterval(changeIntervalRef.current);
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/devices/${id}`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((data) => {
        setTracker(data.data.trackers[data.data.trackers.length - 1]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
    return () => {
      clearInterval(changeIntervalRef.current);
    };
  }, [REACT_APP_API_ENDPOINT, dispatch, id, navigate, user]);

  return (
    <>
      <Button
        onClick={() => {
          onStartStopClick();
        }}
      >
        {buttonLabel}
      </Button>
      <div>
        {tracker && (
          <GoogleMapReact
            style={style}
            containerStyle={containerStyle}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAP_API,
            }}
            center={{
              lat: Number(tracker.latitude),
              lng: Number(tracker.longitude),
            }}
            zoom={7}
          >
            <Marker
              title={"Current Location"}
              lat={Number(tracker.latitude)}
              lng={Number(tracker.longitude)}
            ></Marker>
          </GoogleMapReact>
        )}
        {!tracker && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <h1>No Track yet</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default TrackDevice;
