import React from "react";
import { MenuItem } from "@mui/material";
import DropDown from "../../DropdownWrapper";

const SetReminder = ({
  handleClose,
  handleClick = () => {},
  id,
  anchorEl,
  open,
  reminderoptions,
}) => {
  return (
    <DropDown
      id={id}
      onClose={handleClose}
      anchorEl={anchorEl}
      open={open}
      sx={{
        "& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
          width: { xs: "310px", sm: "270px" },
        },
      }}
    >
      {Object?.entries(reminderoptions)?.map(([key, value]) => (
        <MenuItem key={key} onClick={() => handleClick(key)}>
          {value}
        </MenuItem>
      ))}
    </DropDown>
  );
};

export default SetReminder;
