import { Menu } from "@mui/material";
import * as React from "react";

const DropDown = ({ onClose, id, anchorEl, open, children, sx = () => {} }) => {
  return (
    <Menu
      sx={{ ...sx }}
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      {children}
    </Menu>
  );
};

export default DropDown;
