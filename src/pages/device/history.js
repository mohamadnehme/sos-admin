import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../reducers/userSlice";
import Pagination from "../../components/Pagination";
import Moment from "moment";
import MyVerticallyCenteredModal from "../../components/Modal/index";

const History = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const auth = useSelector((state) => state.userSlice.user);

  const [sos, setSos] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  //   const [pageOrdering, setPageOrdering] = useState(0);
  const PageSize = 10;
  const [modalShow, setModalShow] = useState(false);

  const id = useParams()["id"];
  useEffect(() => {
    axios
      .get(
        `${REACT_APP_API_ENDPOINT}/api/locations?page=${currentPage}&itemsPerPage=${PageSize}&device.id=${id}`,
        {
          headers: { Authorization: "Bearer " + auth.token },
        }
      )
      .then((data) => {
        // console.log(data);
        setSos(data.data["hydra:member"]);
        setTotalCount(data.data["hydra:totalItems"]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
  }, [REACT_APP_API_ENDPOINT, auth, currentPage, dispatch, id, navigate]);
  console.log(sos, totalCount);
  return (
    <>
      <h2>Sos History</h2>
      <div style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}>
        <div style={{ width: "80%", margin: "auto" }}></div>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">device Id</TableCell>
              <TableCell align="center">device name</TableCell>
              <TableCell align="center">Sos date</TableCell>
              <TableCell align="center">latitude</TableCell>
              <TableCell align="center">longitude</TableCell>
              <TableCell align="center">place</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sos.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.device?.device_id}</TableCell>
                <TableCell align="center">{row.device?.name}</TableCell>
                <TableCell align="center">
                {Moment(row.createdAt).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="center">{row.latitude}</TableCell>
                <TableCell align="center">{row.longitude}</TableCell>
                <TableCell align="center">{row.place}</TableCell>
                <TableCell align="center">
                  <button
                    className="btn btn-primary"
                    onClick={() => setModalShow(true)}
                  >
                    Recipients
                  </button>
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    detail={row.device.user.userContacts}
                    onHide={() => setModalShow(false)}
                  />
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

export default History;
