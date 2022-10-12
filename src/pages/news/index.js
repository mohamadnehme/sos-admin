import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Pagination";
import { logout } from "../../reducers/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper";

const ListNews = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const PageSize = 10;
  const [newsList, setNewsList] = useState([]);
  const [pageOrdering, setPageOrdering] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteHandler = (id) => {
    axios
      .delete(`${REACT_APP_API_ENDPOINT}/api/news/` + id, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        const newList = newsList.filter((item) => item.id !== id);
        setNewsList(newList);
        setTotalCount((prev) => prev - 1);
        setCurrentPage(1);
        setPageOrdering((prev) => prev + 1);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (searchTerm === "") {
      axios
        .get(
          `${REACT_APP_API_ENDPOINT}/api/news?page=${currentPage}&itemsPerPage=${PageSize}&order%5BpublishedAt%5D=desc`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        )
        .then((data) => {
          console.log(data);
          setNewsList(data.data["hydra:member"]);
          setTotalCount(data.data["hydra:totalItems"]);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          }
        });
    } else {
      const delayDebounceFn = setTimeout(() => {
        setCurrentPage(1);
        axios
          .get(
            `${REACT_APP_API_ENDPOINT}/api/news?page=${currentPage}&itemsPerPage=${PageSize}&order%5BpublishedAt%5D=desc&country.name=` +
              searchTerm,
            {
              headers: {
                Authorization: "Bearer " + user.token,
              },
            }
          )
          .then((res) => {
            console.log(res);
            setNewsList(res.data["hydra:member"]);
            setTotalCount(res.data["hydra:totalItems"]);
          });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [
    REACT_APP_API_ENDPOINT,
    currentPage,
    dispatch,
    navigate,
    searchTerm,
    user.token,
    pageOrdering,
  ]);
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/createNews");
        }}
      >
        Create
      </Button>
      <div style={{ float: "right" }}>
        <SearchIcon
          style={{
            position: "position",
            marginTop: "9px",
          }}
        />
        &nbsp;
        <TextField
          size="small"
          id="outlined-basic"
          label="Country"
          variant="outlined"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></TextField>
      </div>

      <br />
      <br />
      <Box
        justifyContent={"flex-start"}
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        width="100%"
        gap={5}
      >
        {newsList.map((data) => {
          let preview = 0;
          if (data.country.length === 1) {
            preview = 1;
          }
          if (data.country.length === 2) {
            preview = 2;
          }

          if (data.country.length >= 3) {
            preview = 3;
          }
          return (
            <Paper
              sx={{
                height: 450,
                width: 285,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1em",
              }}
              elevation={1}
              key={data.id}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box textAlign="center" marginTop={1}>
                  <Typography variant="subtitle2">
                    title: {data.title}
                  </Typography>
                </Box>
                <br />
                <div>
                  <img src={data.fileUrl} alt="" width="100%" height="150px" />
                </div>
                <Swiper
                  modules={[FreeMode, Pagination]}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  freeMode={true}
                  className="mySwiper"
                  slidesPerView={preview}
                  spaceBetween={30}
                >
                  {data.country.map((data, index) => (
                    <SwiperSlide key={index}>
                      <img
                        style={{ width: "60px", height: "25%" }}
                        src={data.flagUrl}
                        alt=""
                      />
                      <small>{data.iso_code_2}</small>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
              {/* <Box display="flex" justifyContent="space-around" width="100%">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <div>
                  <Typography variant="subtitle2" sx={{ mb: -1 }}>
                    Author: {data.author}
                  </Typography>
                </div>
              </Box>
            </Box> */}
              <Box display="flex" justifyContent="center">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/showNews/" + data.id);
                      }}
                      className="btn btn-info"
                    >
                      Show
                    </button>
                    &nbsp;
                    <button
                      onClick={() => {
                        navigate("/editNews/" + data.id);
                      }}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      onClick={() => {
                        deleteHandler(data.id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
      <br />
      <br />
      <Page
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ListNews;
