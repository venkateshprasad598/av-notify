import React, { useEffect, useState } from "react";
import AVESelectInput from "../MultiSelectInput/AVESelectInput";
import { channels } from "../../constants/notification";
import { getAllTemplates } from "../../actions/notification/notification";
import { useTheme } from "@mui/material";

const AVEShowAllTemplates = ({
  onChangeOfUpdateChannels,
  inputValue,
  allTemplates,
  activeTemplate,
  theme
}) => {
  return (
    <div>
      <AVESelectInput
        label={"Select a template to update"}
        inputValue={activeTemplate}
        handleChange={onChangeOfUpdateChannels}
        list={inputValue}
        isMultiple={false}
        inputTheme={theme}
      />
    </div>
  );
};

export default AVEShowAllTemplates;
