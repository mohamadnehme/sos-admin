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

import Moment from "moment";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.js";

const ListAlerts = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const [alertsList, setAlertsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [pageOrdering, setPageOrdering] = useState(0);
  const PageSize = 5;
  const { setValue } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAllHandler = () => {
    setValue(true);
    axios
      .delete(`${REACT_APP_API_ENDPOINT}/api/locations/deleteAll`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then(() => {
        setAlertsList([]);
        setTotalCount(0);
        setCurrentPage(1);
        // setPageOrdering((prev) => prev + 1);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      })
      .finally(() => {
        setOpen(false);
        setValue(false);
      });
  };

  const deleteHandler = (id) => {
    setValue(true);
    axios
      .delete(`${REACT_APP_API_ENDPOINT}/api/locations/` + id, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        const userList = alertsList.filter((item) => item.id !== id);
        setAlertsList(userList);
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
        `${REACT_APP_API_ENDPOINT}/api/locations?page=${currentPage}&itemsPerPage=${PageSize}&order%5BcreatedAt%5D=desc`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((data) => {
        console.log(data.data["hydra:member"], data.data["hydra:totalItems"]);
        setAlertsList(data.data["hydra:member"]);
        setTotalCount(data.data["hydra:totalItems"]);
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
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete All
      </Button>
      <br />
      <br />
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete all the logBooks ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              deleteAllHandler();
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">devices id</TableCell>
              <TableCell align="center">created at</TableCell>
              <TableCell align="center">user</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alertsList.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.device.device_id}</TableCell>
                <TableCell align="center">
                  {Moment(row.createdAt).format("dd/mm/yyyy")}
                </TableCell>
                <TableCell align="center">{row.device.user.email}</TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      navigate("/showAlert/" + row.id);
                    }}
                    className="btn btn-info"
                  >
                    Show
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

export default ListAlerts;
