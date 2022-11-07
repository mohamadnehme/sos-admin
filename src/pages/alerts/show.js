import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { logout } from "../../reducers/userSlice";
import GoogleMapReact from "google-map-react";
import image from "../../assets/logo/map-marker_hfipes.png";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ShowAlert = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null);
  const { value, setValue } = useContext(UserContext);

  const id = useParams()["id"];

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
    // position: "relative",
  };
  const containerStyle = {
    position: "absolute",
    overflow: "hidden",
  };

  useEffect(() => {
    setValue(true);
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/locations/${id}`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((data) => {
        console.log(data.data);
        setAlert(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      })
      .finally(() => {
        setValue(false);
      });

  }, [REACT_APP_API_ENDPOINT, dispatch, id, navigate, user, setValue]);

  return (
    <>
      {alert && (
        <>
          <div
            style={{
              position: "absolute",
              width: "40%",
            }}
          >
            <div>
              <GoogleMapReact
                style={style}
                containerStyle={containerStyle}
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_MAP_API,
                }}
                center={{
                  lat: Number(alert.latitude),
                  lng: Number(alert.longitude),
                }}
                zoom={7}
              >
                <Marker
                  title={"Current Location"}
                  lat={Number(alert.latitude)}
                  lng={Number(alert.longitude)}
                ></Marker>
              </GoogleMapReact>
            </div>
          </div>
          <div style={{ width: "20%", marginLeft: "60%" }}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">User</TableCell>
                    <TableCell align="center">
                      {alert.device.user.email}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">Device Id</TableCell>
                    <TableCell align="center">
                      {alert.device.device_id}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">Latitude</TableCell>
                    <TableCell align="center">{alert.latitude}</TableCell>
                  </TableRow>
                  <TableRow
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">Longitude</TableCell>
                    <TableCell align="center">{alert.longitude}</TableCell>
                  </TableRow>

                  <TableRow
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">Altitude</TableCell>
                    <TableCell align="center">{alert.altitude}</TableCell>
                  </TableRow>
                  <TableRow
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">Bearing</TableCell>
                    <TableCell align="center">{alert.bearing}</TableCell>
                  </TableRow>
                  <TableRow
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">Velocity</TableCell>
                    <TableCell align="center">{alert.velocity}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
      {!alert && value === false && (
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1>No location to show</h1>
        </div>
      )}
    </>
  );
};

export default ShowAlert;
