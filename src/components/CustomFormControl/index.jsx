import { FormControl, MenuItem, Select } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./style.css";

const CustomFormControl = ({
  array,
  sx,
  selectSx,
  menuSx,
  value,
  handleChange,
  objectKey = false,
  multi,
  customIcon = false,
  placeholder,
  disable,
  isDepart = false,
}) => {
  return (
    <FormControl fullWidth sx={{ ...sx }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        displayEmpty={!isDepart}
        onChange={!multi && handleChange}
        disabled={disable}
        sx={{
          ...selectSx,
          outline: "none !important",
          boxShadow: "none !important", // Remove extra box-shadow on focus
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #CDCDCD !important",
          },
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              border: "1px solid #CDCDCD",
            },
            "&:hover fieldset": {
              border: "1px solid #CDCDCD",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid #CDCDCD !important",
            },
          },
        }}
        multiple={multi}
        IconComponent={customIcon || ExpandMoreIcon} // Custom icon
        inputProps={{ "aria-label": "Without label" }}
        renderValue={(selected) => {
          if (!selected || selected === 0) {
            return placeholder;
          }
          const selectedItem = array.find(
            (item, index) => index + 1 === selected
          );
          if (!!selectedItem)
            return objectKey ? selectedItem[objectKey] : selectedItem;
        }}
      >
        {array?.map((item, index) => (
          <MenuItem
            key={index}
            onClick={(e) => handleChange(e, item, index + 1)}
            value={index + 1}
            sx={{ menuSx }}
          >
            {!!array?.length &&
            objectKey &&
            !!item &&
            !!item?.hasOwnProperty(objectKey)
              ? item[objectKey]
              : item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomFormControl;
