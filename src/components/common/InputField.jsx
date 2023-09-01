import { TextField } from "@mui/material";
import React from "react";

const InputField = ({ label, rows, multiline, ...props }) => {
  return (
    <TextField
      id="outlined-multiline-static"
      fullWidth
      label={label}
      style={{ margin: "8px" }}
      multiline={multiline ? multiline : false}
      rows={multiline ? rows : 0}
      {...props}
    />
  );
};

export default InputField;
