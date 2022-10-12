import {
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../reducers/userSlice";

const { REACT_APP_API_ENDPOINT } = process.env;

const CreateDevice = () => {
  const auth = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  let valid = name !== "" && type !== "" && user !== "";

  const onSubmit = () => {
    if (valid) {
      setLoading(true);

      axios
        .post(
          `${REACT_APP_API_ENDPOINT}}/api/devices`,
          {
            name: name,
            type: type,
            user: "/api/users/" + user,
          },
          {
            headers: {
              Authorization: "Bearer " + auth.token,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((data) => {
          console.log(data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          dispatch(logout());
          navigate("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    if (!auth) {
      return;
    }
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/getAllUsers`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
  }, [dispatch, navigate, auth]);

  return (
    <>
      <h2>Create Device</h2>
      <div style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}>
        <div style={{ width: "80%", margin: "auto" }}>
          <FormGroup>
            <TextField
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            ></TextField>
            <br />
            <TextField
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
              id="outlined-basic"
              label="Type"
              variant="outlined"
            ></TextField>
            <br />
            <InputLabel id="demo-checkbox-label">User</InputLabel>
            <br></br>
            <Select
              labelId="demo-checkbox-label"
              id="demo-checkbox"
              value={user}
              onChange={handleChange}
              input={<OutlinedInput label="Users" />}
              MenuProps={MenuProps}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <ListItemText
                    primary={user.firstname + " " + user.lastname}
                  />
                </MenuItem>
              ))}
            </Select>
            <br />
            <br />

            <Button
              disabled={!valid || loading}
              onClick={onSubmit}
              style={{
                borderRadius: 35,
                padding: "18px 36px",
                fontSize: "18px",
              }}
              variant="contained"
            >
              Submit
            </Button>
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default CreateDevice;
