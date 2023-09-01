import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AVESelectTemplate = ({
  type,
  label,
  notificationIndex,
  inputValue,
  theme,
  template,
  makeTemplateDynamic,
  handleChangeTemplate,
  handleInputChangeTemplate,
  getStyles,
}) => {
  return (
    <div className="av-notify-placeholder">
      <InputLabel
        id="demo-multiple-name-label"
        style={{ fontWeight: "600", margin: "1rem 1rem 0.5rem 1rem" }}
      >
        For {type} Notification :
      </InputLabel>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={inputValue}
          onChange={(event, index) => handleChangeTemplate(event, index, type)}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {template?.map((data, index) => (
            <MenuItem
              key={index}
              id={index}
              value={data?.body}
              style={getStyles(data?.body, inputValue, theme)}
            >
              {data?.body}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        {notificationIndex || notificationIndex == 0
          ? Object.keys(template[notificationIndex]?.placeholders)?.map(
              (data) => {
                return (
                  <div className="av-notify-textField">
                    <TextField
                      fullWidth
                      label={data}
                      name={data}
                      value={
                        template[notificationIndex]?.placeholders?.[data]
                          ?.default
                      }
                      onChange={(event) =>
                        handleInputChangeTemplate(event, type)
                      }
                    />
                  </div>
                );
              }
            )
          : null}
      </div>
      <div className="av-notify-dynamic-template">
        {notificationIndex || notificationIndex == 0
          ? makeTemplateDynamic(template[notificationIndex])
          : null}
      </div>
    </div>
  );
};

export default AVESelectTemplate;
