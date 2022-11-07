import { Box, FormGroup, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper";
import { logout } from "../../reducers/userSlice";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ShowNews = () => {
  const { setValue } = useContext(UserContext);
  const dispatch = useDispatch();
  const { REACT_APP_API_ENDPOINT } = process.env;
  const auth = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const [news, setNews] = useState({
    author: "",
    title: "",
    description: "",
    url: "",
    publishedAt: "",
    fileUrl: "",
    content: "",
    isPublish: "",
    country: [],
  });

  const id = useParams()["id"];
  useEffect(() => {
    setValue(true);
    if (auth == null) {
      console.log(auth);
      navigate("/login");
      return;
    }
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/news/` + id, {
        headers: { Authorization: "Bearer " + auth.token },
      })
      .then((data) => setNews(data.data))
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      })
      .finally(() => {
        setValue(false);
      });
  }, [REACT_APP_API_ENDPOINT, auth, id, navigate, dispatch, setValue]);
  console.log(news);
  return (
    <>
      <h2>Show News</h2>
      <div style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}>
        <div style={{ width: "80%", margin: "auto" }}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <img
              src={news.fileUrl}
              alt={""}
              loading="lazy"
              width={"400px"}
              margin={"auto"}
            />

            <Swiper
              modules={[FreeMode, Pagination]}
              pagination={{
                dynamicBullets: true,
              }}
              freeMode={true}
              className="mySwiper"
              // slidesPerView={1}
              // spaceBetween={30}
            >
              {news.country.map((data, index) => (
                <SwiperSlide key={index}>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={data.flagUrl}
                    alt=""
                  />
                  {data.name}
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          <br />
          <br />
          <FormGroup>
            <TextField
              value={news.author}
              id="outlined-basic"
              label="Author"
              variant="outlined"
              disabled={true}
            ></TextField>
            <br />
            <TextField
              value={news.title}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              disabled={true}
            ></TextField>
            <br />
            <TextField
              value={news.description}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              disabled={true}
            ></TextField>
            <br />
            <TextField
              value={news.url}
              id="outlined-basic"
              label="URL"
              variant="outlined"
              disabled={true}
            ></TextField>
            <br />
            <TextField
              value={news.publishedAt}
              id="outlined-basic"
              label="Published At"
              variant="outlined"
              disabled={true}
            ></TextField>
            <br />
            <TextField
              value={news.content}
              id="outlined-basic"
              label="Content"
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

export default ShowNews;
