import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../../index.css";
import Moment from "moment";

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Contacts List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">image</TableCell>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">firstname</TableCell>
              <TableCell align="center">lastname</TableCell>
              <TableCell align="center">date</TableCell>
              <TableCell align="center">user</TableCell>
              <TableCell align="center">mobile number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.detail.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <img src={row.contact.fileUrl} alt="" width="150" />
                </TableCell>
                <TableCell align="center">{row.contact.id}</TableCell>
                <TableCell align="center">{row.contact.firstname}</TableCell>
                <TableCell align="center">{row.contact.lastname}</TableCell>
                <TableCell align="center">
                {Moment(row.createdAt).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="center">{row.contact.email}</TableCell>
                <TableCell align="center">{row.contact.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}