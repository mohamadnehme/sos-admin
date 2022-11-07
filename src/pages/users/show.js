import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import UserInfo from "../../components/UserInfo";
import { Settings } from "../../components/UserInfo/settings";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../reducers/userSlice.js";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserContacts from "./contacts";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ShowUser = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const auth = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [domain, setDomain] = useState("");
  const [angle, setAngle] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [distance, setDistance] = useState("");
  const [frequency, setFrequency] = useState("");
  const [offline_buffering, setOffline_buffering] = useState(false);
  const [contacts, setContacts] = useState([]);
  const { setValue } = useContext(UserContext);

  const [user, setUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    fileUrl: "",
    roles: [],
    country: {},
  });

  const id = useParams()["id"];
  useEffect(() => {
    setValue(true);
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/users/` + id, {
        headers: { Authorization: "Bearer " + auth.token },
      })
      .then((data) => {
        const dom = data.data.settings.domain;
        const ac = data.data.settings.accuracy;
        const an = data.data.settings.angle;
        const di = data.data.settings.distance;
        const f = data.data.settings.frequency;
        const off = data.data.settings.offline_buffering;
        const users = data.data;
        setDomain(dom);
        setAccuracy(ac);
        setAngle(an);
        setDistance(di);
        setFrequency(f);
        setOffline_buffering(off);
        setUser(users);
      })
      .catch((err) => {
        console.log(err);
        setValue(false);
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/users/${id}/contacts`, {
        headers: { Authorization: "Bearer " + auth.token },
      })
      .then((data) => {
        console.log(data.data["hydra:member"], data.data["hydra:totalItems"]);

        setContacts(data.data["hydra:member"]);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      })
      .finally(() => {
        setValue(false);
      });
  }, [REACT_APP_API_ENDPOINT, auth.token, dispatch, id, navigate, setValue]);

  return (
    <>
      <h2>Show User</h2>
      <div style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}>
        <div style={{ width: "80%", margin: "auto" }}>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Info">
              <UserInfo user={user} />
            </Tab>
            <Tab eventKey="profile" title="Roles">
              <ul>
                {user.roles.map((role, index) => {
                  return <li key={index}>{role}</li>;
                })}
              </ul>
            </Tab>
            <Tab eventKey="contact" title="Settings">
              <Settings
                domain={domain}
                angle={angle}
                accuracy={accuracy}
                distance={distance}
                frequency={frequency}
                offline_buffering={offline_buffering}
              />
            </Tab>
            <Tab eventKey="contacts" title="Contacts">
              <UserContacts contacts={contacts} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ShowUser;
