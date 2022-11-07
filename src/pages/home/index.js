import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Sidebar";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import CreateDevice from "../device/create";
import TrackDevice from "../device/track";
import GeofenceDevice from "../device/geofence";
import ListDevice from "../device";
import ShowDevice from "../device/show";
import EditDevice from "../device/edit";
import ListNews from "../news";
import ShowNews from "../news/show";
import CreateNews from "../news/create";
import EditNews from "../news/edit";
import ListUsers from "../users";
import ShowUser from "../users/show";
import { CreateUser } from "../users/create";
import { EditUser } from "../users/edit";
import ListAlerts from "../alerts";
import ShowAlert from "../alerts/show";
import { Settings } from "../settings";
import UserContacts from "../users/contacts";
import History from "../device/history";
import Monitor from "../monitor";
import MyLoader from "../../components/Loader";
import { EditContact } from "../users/editContact";
import Trace from "../device/trace";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const { REACT_APP_API_ENDPOINT } = process.env;
  const user = useSelector((state) => state.userSlice.user);

  const [value, setValue] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      console.log(user);
      navigate("/login");
      return;
    }
    // axios
    //   .get(`${REACT_APP_API_ENDPOINT}/api/me`, {
    //     headers: {
    //       Authorization: "Bearer " + user.token,
    //     },
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     navigate('/login')
    //   });
  }, [REACT_APP_API_ENDPOINT, navigate, user]);

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <MyLoader active={value}>
        <Box sx={{ display: "flex" }}>
          <Sidebar user={user} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              {/* Device Routes */}
              <Route exact path="/" element={<ListDevice />} />
              <Route exact path="/createDevice" element={<CreateDevice />} />
              <Route exact path="/showDevice/:id" element={<ShowDevice />} />
              <Route exact path="/editDevice/:id" element={<EditDevice />} />
              <Route exact path="/trackDevice/:id" element={<TrackDevice />} />
              <Route exact path="/monitor" element={<Monitor />} />
              <Route exact path="/history/:id" element={<History />} />
              <Route exact path="/trace/:id" element={<Trace />} />
              <Route
                exact
                path="/geoDevice/:id"
                element={<GeofenceDevice user={user} />}
              />
              {/* News Routes */}
              <Route exact path="/news" element={<ListNews />} />
              <Route exact path="/createNews" element={<CreateNews />} />
              <Route exact path="/showNews/:id" element={<ShowNews />} />
              <Route exact path="/editNews/:id" element={<EditNews />} />

              {/* Users Routes */}
              <Route exact path="/users" element={<ListUsers />} />
              <Route exact path="/createUser" element={<CreateUser />} />
              <Route exact path="/showUser/:id" element={<ShowUser />} />
              <Route exact path="/editUser/:id" element={<EditUser />} />
              <Route exact path="/editContact/:id" element={<EditContact />} />
              <Route
                exact
                path="/showUserContacts/:id"
                element={<UserContacts />}
              />

              {/* Alert Routes */}
              <Route exact path="/alerts" element={<ListAlerts />} />
              <Route exact path="/showAlert/:id" element={<ShowAlert />} />

              {/* Settings Routes */}
              <Route exact path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </MyLoader>
    </UserContext.Provider>
  );
};
export default Home;
