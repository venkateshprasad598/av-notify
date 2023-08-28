import { Button } from "@mui/material";
import React from "react";

const FormNavigation = ({ hasPrevious, onBackClick, isLastStep }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isLastStep ? "space-between" : "flex-end",
        marginTop: "15px",
      }}
    >
      {hasPrevious && (
        <Button variant="contained" type="button" onClick={onBackClick}>
          Back
        </Button>
      )}
      <div>
        <Button variant="contained" color="primary" type="submit">
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;
