import { FormGroup, TextField } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../reducers/userSlice";

const ShowDevice = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const auth = useSelector((state) => state.userSlice.user);
  const { setValue } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [device, setDevice] = useState({
    name: "",
    type: "",
    user: {
      email: "",
    },
  });

  const id = useParams()["id"];
  useEffect(() => {
    setValue(true);
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/devices/` + id, {
        headers: { Authorization: "Bearer " + auth.token },
      })
      .then((data) => setDevice(data.data))
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      })
      .finally(() => {
        setValue(false);
      });
  }, [REACT_APP_API_ENDPOINT, auth.token, id, dispatch, navigate, setValue]);

  return (
    <>
      <h2>Show Device</h2>
      <div style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}>
        <div style={{ width: "80%", margin: "auto" }}>
          <FormGroup>
            <TextField
              value={device.name}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              disabled={true}
            ></TextField>
            <br />
            <TextField
              value={device.type}
              id="outlined-basic"
              label="Type"
              variant="outlined"
              disabled={true}
            ></TextField>
            <br />
            <TextField
              value={device.user.email}
              id="outlined-basic"
              label="User"
              variant="outlined"
              disabled={true}
            ></TextField>
            <br />
            <br />
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default ShowDevice;
