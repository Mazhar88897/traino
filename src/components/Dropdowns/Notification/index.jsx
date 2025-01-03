import { MenuItem } from "@mui/material";
import React from "react";
import DropDown from "../../DropdownWrapper";

const Notification = ({ handleClose, id, anchorEl, open }) => {
  const options = [
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4",
  ];

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

export default Notification;
