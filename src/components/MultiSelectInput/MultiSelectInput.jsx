import { useTheme } from "@emotion/react";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useField } from "formik";
import { default as React } from "react";

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

const MultiSelectInput = ({ label, ...props }) => {
  const { list, value, handleChange } = props;
  const theme = useTheme();
  const [field, meta] = useField(props);

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {list.map((data) => (
          <MenuItem
            key={data}
            value={data}
            style={getStyles(data, value, theme)}
          >
            {data}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectInput;
