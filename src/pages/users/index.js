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
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.js";

const ListUsers = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [pageOrdering, setPageOrdering] = useState(0);
  const { setValue } = useContext(UserContext);

  const PageSize = 5;

  const deleteHandler = (id) => {
    setValue(true);
    axios
      .delete(`${REACT_APP_API_ENDPOINT}/api/users/` + id, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        const userList = usersList.filter((item) => item.id !== id);
        setUsersList(userList);
        setTotalCount((prev) => prev - 1);
        setCurrentPage(1);
        setPageOrdering((prev) => prev + 1);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      })
      .finally(() => {
        setValue(false);
      });
  };

  useEffect(() => {
    if (user == null) {
      navigate("/login");
      return;
    }
    setValue(true);
    axios
      .get(
        `${REACT_APP_API_ENDPOINT}/api/users?page=${currentPage}&itemsPerPage=${PageSize}&order%5BcreatedAt%5D=desc`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((data) => {
        console.log(data.data["hydra:member"], data.data["hydra:totalItems"]);
        setUsersList(data.data["hydra:member"]);
        setTotalCount(data.data["hydra:totalItems"]);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      }).finally(() => {
        setValue(false);
      });
  }, [
    REACT_APP_API_ENDPOINT,
    currentPage,
    dispatch,
    navigate,
    user,
    pageOrdering,
    setValue
  ]);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/createUser");
        }}
      >
        Create
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">image</TableCell>
              <TableCell align="center">device id</TableCell>
              <TableCell align="center">firstname</TableCell>
              <TableCell align="center">lastname</TableCell>
              <TableCell align="center">created at</TableCell>
              <TableCell align="center">user</TableCell>
              <TableCell align="center">mobile number</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <img src={row.fileUrl} alt="" width="150" />
                </TableCell>
                <TableCell align="center">{row.devices[row.devices.length - 1]?.device_id}</TableCell>
                <TableCell align="center">{row.firstname}</TableCell>
                <TableCell align="center">{row.lastname}</TableCell>
                <TableCell align="center">
                {Moment(row.createdAt).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      navigate("/showUser/" + row.id);
                    }}
                    className="btn btn-info"
                  >
                    Show
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      navigate("/editUser/" + row.id);
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

export default ListUsers;
