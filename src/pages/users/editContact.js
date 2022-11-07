import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FormGroup, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const { REACT_APP_API_ENDPOINT } = process.env;

export const EditContact = () => {
  const params = useParams();
  const id = params["id"];
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.userSlice.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth == null) {
      navigate("/login");
      return;
    }
  }, [auth, navigate]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/contacts/` + id, {
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
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [id, navigate, auth]);

  let valid = email !== "" && phone !== "";

  const onSubmit = () => {
    if (email !== "" && phone !== "") {
      setLoading(true);

      axios
        .put(
          `${REACT_APP_API_ENDPOINT}/api/contacts/` + id,
          {
            email: email,
            phone: phone,
          },
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        )
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

  return (
    <>
      <h2>Edit Contact</h2>
      <div style={{ width: "100%", marginBottom: "5%" }}>
        <div style={{ width: "80%", margin: "auto" }}>
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
              disabled={true}
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
              disabled={true}
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
