import React from "react";
import "./AVEUpdateTemplate.css";
import { TextField } from "@mui/material";
const AVEUpdateTemplate = () => {
  return (
    <div className="ave-update-template">
      <div className="ave-update-template-container">
        {" "}
        <TextField type="text" label="update template" fullWidth />
      </div>
    </div>
  );
};

export default AVEUpdateTemplate;
