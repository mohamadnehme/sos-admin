import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../reducers/userSlice.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "../../components/Pagination";

import "../../index.css";
import Button from "@mui/material/Button";

import Moment from "moment";
import {
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
// import { setLoading } from "../../reducers/loadingSlice.js";

const MenuProps = {
  PaperProps: {
    style: {
      height: "auto",
      width: 250,
    },
  },
};

const ListDevice = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const [deviceList, setDeviceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [pageOrdering, setPageOrdering] = useState(0);
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const PageSize = 5;

  const handleChange = (event) => {
    const value = event.target.value;
    setStatus(value);
  };

  const StatusCircle = (props) => {
    let color =
      props.status === 1 ? "green" : props.status === 0 ? "red" : "yellow";
    return (
      <div
        style={{ width: "25px", height: "25px", backgroundColor: color, margin: 'auto', borderRadius: '20px' }}
      ></div>
    );
  };

  const deleteHandler = (id) => {
    axios
      .delete(`${REACT_APP_API_ENDPOINT}/api/devices/` + id, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        const newList = deviceList.filter((item) => item.id !== id);
        setDeviceList(newList);
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
    if (user == null) {
      navigate("/login");
      return;
    }
    const s =
      status === "all"
        ? ""
        : status === "active"
        ? 1
        : status === "inactive"
        ? 0
        : -1;
    // dispatch(setLoading(true));
    if (searchTerm === "") {
      axios
        .get(
          `${REACT_APP_API_ENDPOINT}/api/devices?page=${currentPage}&itemsPerPage=${PageSize}&order%5BcreatedAt%5D=desc&status=${s}`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        )
        .then((data) => {
          console.log(data.data);
          setDeviceList(data.data["hydra:member"]);
          setTotalCount(data.data["hydra:totalItems"]);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          }
        })
        .finally(() => {
          // dispatch(setLoading(false));
        });
    } else {
      const delayDebounceFn = setTimeout(() => {
        setCurrentPage(1);
        axios
          .get(
            `${REACT_APP_API_ENDPOINT}/api/devices?page=${currentPage}&itemsPerPage=${PageSize}&order%5BcreatedAt%5D=desc&status=${s}&user.email=` +
              searchTerm,
            {
              headers: {
                Authorization: "Bearer " + user.token,
              },
            }
          )
          .then((res) => {
            console.log(res);
            setDeviceList(res.data["hydra:member"]);
            setTotalCount(res.data["hydra:totalItems"]);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              dispatch(logout());
              navigate("/login");
            }
          })
          .finally(() => {
            // dispatch(setLoading(false));
          });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [
    REACT_APP_API_ENDPOINT,
    currentPage,
    dispatch,
    navigate,
    user,
    pageOrdering,
    status,
    searchTerm,
  ]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/createDevice");
            }}
          >
            Create
          </Button>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <InputLabel id="demo-multiple-checkbox-label">User</InputLabel>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              placeholder="Email"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></TextField>
          </div>
          &nbsp; &nbsp;
          <div>
            <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
            <Select
              style={{ width: "100px", height: "40px" }}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={status}
              onChange={handleChange}
              input={<OutlinedInput label="Status" />}
              MenuProps={MenuProps}
            >
              <MenuItem key={1} value={"all"}>
                <ListItemText primary={"all"} />
              </MenuItem>

              <MenuItem key={2} value={"active"}>
                <ListItemText primary={"active"} />
              </MenuItem>

              <MenuItem key={3} value={"inactive"}>
                <ListItemText primary={"inactive"} />
              </MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">device id</TableCell>
              <TableCell align="center">name</TableCell>
              <TableCell align="center">type</TableCell>
              <TableCell align="center">created at</TableCell>
              <TableCell align="center">user name</TableCell>
              <TableCell align="center">user email</TableCell>
              <TableCell align="center">status</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceList.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.device_id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">
                  {Moment(row.createdAt).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="center">
                  {row.user.firstname + " " + row.user.lastname}
                </TableCell>
                <TableCell align="center">{row.user.email}</TableCell>
                <TableCell align="center">
                  <StatusCircle status={row.status} />
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      navigate("/showDevice/" + row.id);
                    }}
                    className="btn btn-info"
                  >
                    Show
                  </button>
                </TableCell>

                <TableCell align="center">
                  <button
                    onClick={() => {
                      navigate("/showUser/" + row.user.id);
                    }}
                    className="btn btn-dark"
                  >
                    User Device
                  </button>
                </TableCell>

                <TableCell align="center">
                  <button
                    onClick={() => {
                      navigate("/editDevice/" + row.id);
                    }}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      deleteHandler(row.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      navigate("/history/" + row.id);
                    }}
                    className="btn btn-light"
                  >
                    Show history
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      navigate("/geoDevice/" + row.id);
                    }}
                    className="btn btn-light"
                  >
                    Geofence
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ListDevice;
