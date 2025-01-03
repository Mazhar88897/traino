import { MenuItem } from "@mui/material";
import React from "react";
import DropDown from "../../DropdownWrapper";

const AssignTo = ({ handleClose, id, anchorEl, open }) => {
  const options = ["All user", "User 1", "User 2", "User 3", "User 4"];

  return (
    <DropDown id={id} onClose={handleClose} anchorEl={anchorEl} open={open}>
      {options.map((val, index) => {
        return (
          <MenuItem key={index} onClick={handleClose}>
            {val}
          </MenuItem>
        );
      })}
    </DropDown>
  );
};

export default AssignTo;
