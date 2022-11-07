import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useNavigate } from "react-router-dom";
import Account from "./pages/account";
import { useEffect } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";
import Home from "./pages/home";

function App() {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const user = useSelector((state) => state.userSlice.user);
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
    <>
      <ToastContainer hideProgressBar />
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/login" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
