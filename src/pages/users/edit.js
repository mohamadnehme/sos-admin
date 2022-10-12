import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import enLocale from "i18n-iso-countries/langs/en.json";
import {
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

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
var countries = require("i18n-iso-countries");

const { REACT_APP_API_ENDPOINT } = process.env;

export const EditUser = () => {
  const params = useParams();
  const id = params["id"];
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isoCountry, setIsoCountry] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countryArr, setCountryArr] = useState([]);

  const auth = useSelector((state) => state.userSlice.user);

  const navigate = useNavigate();

  useEffect(() => {
    countries.registerLocale(enLocale);
    const countryObj = countries.getNames("en", { select: "official" });
    setCountryArr(
      Object.entries(countryObj).map(([key, value]) => {
        return {
          label: value,
          value: key,
        };
      })
    );
  }, []);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/users/` + id, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then((data) => {
        console.log(data.data);
        setFirstname(data.data.firstname);
        setLastname(data.data.lastname);
        setEmail(data.data.email);
        setPhone(data.data.phone);
        setFileUrl(data.data.fileUrl);
        setIsoCountry(data.data.isoCountry);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [id, navigate, auth]);

  let valid =
    firstname !== "" &&
    lastname !== "" &&
    email !== "" &&
    phone !== "" &&
    isoCountry !== "";

  const onSubmit = () => {
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      phone !== "" &&
      isoCountry !== ""
    ) {
      setLoading(true);
      var formData = new FormData();

      formData.append("firstname", firstname);

      formData.append("lastname", lastname);

      formData.append("email", email);

      formData.append("phone", phone);

      formData.append("isoCountry", isoCountry);

      if (file) formData.append("file", file);

      axios
        .post(`${REACT_APP_API_ENDPOINT}/api/updateUser/` + id, formData, {
          headers: {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          console.log(data);
          navigate("/users");
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (event) => {
    setIsoCountry(event.target.value);
  };

  return (
    <>
      <h2>Edit User</h2>
      <div style={{ width: "100%", marginBottom: "5%" }}>
        <div style={{ width: "80%", margin: "auto" }}>
          <div style={{ width: "100%", textAlign: "center" }}>
            {fileUrl !== "" && (
              <Box
                style={{ maxWidth: "500px" }}
                component="img"
                alt=""
                src={fileUrl}
              />
            )}
          </div>
          <br />
          <br />
          <FormGroup>
            <TextField
              value={firstname}
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Firstname"
              variant="outlined"
            />
            <br />
            <TextField
              value={lastname}
              onChange={(event) => {
                setLastname(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Lastname"
              variant="outlined"
            />
            <br />
            <TextField
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Email"
              variant="outlined"
            />
            <br />
            <TextField
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Phone"
              variant="outlined"
            />
            <br />
            <InputLabel id="demo-checkbox-label">Country</InputLabel>
            <br></br>
            <Select
              labelId="demo-checkbox-label"
              id="demo-checkbox"
              value={isoCountry}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              MenuProps={MenuProps}
            >
              {countryArr.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  <ListItemText primary={label} />
                </MenuItem>
              ))}
            </Select>
            <br />
            <br />
            <input type="file" onChange={onChange} />
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
