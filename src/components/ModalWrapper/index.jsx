import { Box, Modal } from "@mui/material";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Style } from "./style";

const ModalWrapper = ({ children, crossIcon, sx, open, setOpen, boxCss, isCloseAble, closeSx, setData = () => {} }) => {
  const handleClose = () => {
    setOpen(false)
    setData(false)
  };
  return (
    <Modal open={open} sx={Style.wrapper} onClose={() => isCloseAble && handleClose()}>
      <Box className={boxCss} sx={{ ...Style.main, ...sx }}>
        {crossIcon && (
          <Box sx={{...Style.actionBtn, ...closeSx}}>
            <RxCross2 onClick={handleClose} />
          </Box>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
