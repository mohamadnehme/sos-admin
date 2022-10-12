import { FormGroup, TextField } from "@mui/material";
import Box from "@mui/material/Box";

const UserInfo = (props) => {
  return (
    <>
      <FormGroup>
        <img src={props.user.imgUrl} width="400" alt="" />
        <br />
        <TextField
          value={props.user.firstname + " " + props.user.lastname}
          id="outlined-basic"
          label="Full name"
          variant="outlined"
          disabled={true}
        ></TextField>
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          value={props.user.email}
          variant="outlined"
          disabled={true}
        ></TextField>
        <br />
        <TextField
          value={props.user.phone}
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          disabled={true}
        ></TextField>
        <br />
        <p style={{color: '#C6C6C6'}}>Country:</p>
        <Box display="flex" flexDirection="column" style={{ width: "60px", marginLeft: '1%' }}>
          <img
            style={{ width: "60px", height: "25%" }}
            src={props.user.country.flagUrl}
            alt=""
          />
          <small style={{ textAlign: "center" }}>
            {props.user.country.iso_code_2}
          </small>
        </Box>
        <br />
        <br />
      </FormGroup>
    </>
  );
};

export default UserInfo;
