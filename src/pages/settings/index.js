import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { logout } from "../../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_ENDPOINT } = process.env;

export const Settings = () => {
  const [domain, setDomain] = useState("");
  // const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [angle, setAngle] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [distance, setDistance] = useState("");
  const [frequency, setFrequency] = useState("");
  const [offline_buffering, setOffline_buffering] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userSlice.user);

  const valid =
    domain !== "" &&
    accuracy !== "" &&
    angle !== "" &&
    distance !== "" &&
    distance >= 0 &&
    angle >= 0 &&
    frequency >= 0 &&
    frequency !== "" &&
    // ip !== "" &&
    port !== "";

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/getSettings`)
      .then((data) => {
        setDomain(data.data.domain);
        setAccuracy(data.data.accuracy);
        setAngle(data.data.angle);
        setDistance(data.data.distance);
        setFrequency(data.data.frequency);
        setOffline_buffering(data.data.offline_buffering);
        // setIp(data.data.ip);
        setPort(data.data.port);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
  }, [dispatch, navigate]);

  const handleDomain = (event) => {
    setDomain(event.target.value);
  };
  // const handleIp = (event) => {
  //   setIp(event.target.value);
  // };
  const handlePort = (event) => {
    setPort(event.target.value);
  };
  const handleAngle = (event) => {
    setAngle(event.target.value);
  };
  const handleAccuracy = (event) => {
    setAccuracy(event.target.value);
  };
  const handleDistance = (event) => {
    setDistance(event.target.value);
  };
  const handleFrequency = (event) => {
    setFrequency(event.target.value);
  };
  const handleOfflineBuffering = (event) => {
    setOffline_buffering(event.target.checked);
  };

  const handleSubmit = () => {
    if (valid) {
      setLoading(true);
      axios
        .post(
          `${REACT_APP_API_ENDPOINT}/api/users/updateAdminSetting/` +
            jwt_decode(user.token).id,
          {
            settings: {
              domain: domain,
              accuracy: accuracy,
              angle: angle,
              distance: distance,
              frequency: frequency,
              offline_buffering: offline_buffering,
              // ip: ip,
              port: port,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <h1>Settings</h1>
      <Box
        style={{ textAlign: "center" }}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50%" },
          display: "grid",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-currency"
            label="Domain or Ip"
            value={domain}
            onChange={handleDomain}
            helperText="Please select a domain or ip"
          ></TextField>
          {/* <TextField
            id="outlined-select-currency"
            label="Ip"
            value={ip}
            onChange={setIp}
            helperText="Please select an ip"
          ></TextField> */}
          <TextField
            id="outlined-select-currency"
            label="Port"
            value={port}
            onChange={handlePort}
            helperText="Please select a port"
          ></TextField>
          <TextField
            id="outlined-select-currency"
            type="number"
            label="Angle"
            value={angle}
            onChange={handleAngle}
            helperText="Please select an angle"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          ></TextField>

          <TextField
            id="outlined-select-currency"
            type="number"
            label="Frequency"
            value={frequency}
            onChange={handleFrequency}
            helperText="Please select a frequency"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          ></TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Accuracy"
            value={accuracy}
            onChange={handleAccuracy}
            helperText="Please select an accuracy"
          >
            <MenuItem key={1} value={"high"}>
              High
            </MenuItem>
            <MenuItem key={2} value={"mid"}>
              Mid
            </MenuItem>
            <MenuItem key={3} value={"low"}>
              Low
            </MenuItem>
          </TextField>

          <TextField
            id="outlined-select-currency"
            type="number"
            label="Distance"
            value={distance}
            onChange={handleDistance}
            helperText="Please select a distance"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          ></TextField>
          <br />
          <br />
          <div style={{ width: "50%", textAlign: "left", margin: "auto" }}>
            <InputLabel>offline buffering</InputLabel>
            <Switch
              checked={offline_buffering}
              onChange={handleOfflineBuffering}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <br />
          <br />
          <Button
            disabled={!valid || loading}
            onClick={handleSubmit}
            style={{
              width: "50%",
              borderRadius: 35,
              padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </Box>
    </>
  );
};
