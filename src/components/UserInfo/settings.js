import { InputLabel, Switch, TextField } from "@mui/material";
import Box from "@mui/material/Box";

export const Settings = (props) => {
  return (
    <>
      <Box
        style={{ textAlign: "center", marginTop: "5%" }}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50%" },
          display: "grid",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-currency"
            label="Domain or Ip"
            value={props.domain}
            helperText="Please select a domain"
            disabled={true}
          ></TextField>
          <TextField
            id="outlined-select-currency"
            label="Port"
            value={props.port}
            helperText="Please select a domain"
            disabled={true}
          ></TextField>
          <TextField
            id="outlined-select-currency"
            type="number"
            label="Angle"
            value={props.angle}
            helperText="Please select an angle"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            disabled={true}
          ></TextField>

          <TextField
            id="outlined-select-currency"
            type="number"
            label="Frequency"
            value={props.frequency}
            helperText="Please select a frequency"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            disabled={true}
          ></TextField>

          <TextField
            id="outlined-select-currency"
            label="Accuracy"
            value={props.accuracy}
            helperText="Please select an accuracy"
            disabled={true}
          ></TextField>

          <TextField
            id="outlined-select-currency"
            type="number"
            label="Distance"
            value={props.distance}
            helperText="Please select a distance"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            disabled={true}
          ></TextField>
          <br />
          <br />
          <div style={{ width: "50%", textAlign: "left", margin: "auto" }}>
            <InputLabel>offline buffering</InputLabel>
            <Switch
              checked={props.offline_buffering}
              inputProps={{ "aria-label": "controlled" }}
              disabled={true}
            />
          </div>
          <br />
          <br />
        </div>
      </Box>
    </>
  );
};
