import * as React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { updateDrawer } from "../../store/slice/drawer";
import { useDispatch } from "react-redux";
import { Style } from "./Style";

const SmallScreenSlider = ({ children, setOpen, open, anchor = false, sx }) => {
  const dispatch = useDispatch();
  const handleDrawerClose = () => {
    setOpen((prev) => {
      if (!anchor) dispatch(updateDrawer({ drawer: !prev }));
      return !prev;
    });
  };

  return (
    <>
      <Drawer anchor={anchor || "left"} open={open} onClose={handleDrawerClose}>
        <Box
          sx={{ ...Style.smallScreenSlider, ...sx }}
          role="presentation"
          onClick={() => {
            if (!anchor) handleDrawerClose();
          }}
        >
          {children}
        </Box>
      </Drawer>
    </>
  );
};
export default SmallScreenSlider;
