import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../../index.css";
import Moment from "moment";

const UserContacts = (props) => {
  return (
    <>
      <h2>User Contacts</h2>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">image</TableCell>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">firstname</TableCell>
              <TableCell align="center">lastname</TableCell>
              <TableCell align="center">created at</TableCell>
              <TableCell align="center">user</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.contacts.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <img src={row.fileUrl} alt="" width="150" />
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.firstname}</TableCell>
                <TableCell align="center">{row.lastname}</TableCell>
                <TableCell align="center">
                  {Moment(row.createdAt).format("dd/mm/yyyy")}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserContacts;
