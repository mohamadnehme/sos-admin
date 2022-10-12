import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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

export const CreateUser = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isoCountry, setIsoCountry] = useState("");
  const [plainPassword, setPlainPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countryArr, setCountryArr] = useState([]);

  const auth = useSelector((state) => state.userSlice.user);

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

  // imageList, addUpdateIndex,
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

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

      formData.append("plainPassword", plainPassword);

      formData.append("isoCountry", isoCountry);

      if (file) formData.append("file", file);

      axios
        .post(`${REACT_APP_API_ENDPOINT}/api/users`, formData, {
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
      <h2>Create User</h2>
      <div style={{ width: "100%", marginBottom: "5%", marginTop: "3%" }}>
        <div style={{ width: "80%", margin: "auto" }}>
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
              value={plainPassword}
              onChange={(event) => {
                setPlainPassword(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Plain Password"
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
