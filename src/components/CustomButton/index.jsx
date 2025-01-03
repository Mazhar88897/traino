import React from "react";
import Button from "@mui/material/Button";
import { Style } from "./style";
import { CircularProgress, Typography } from "@mui/material";
import { COLORS } from "../../theme";

const CustomButton = (props) => {
  const {
    buttonText,
    color,
    sx = {},
    typSx,
    icon,
    rightIcon,
    onClick = () => { },
    disable,
    loading,
    type,
    hoverSx,
  } = props;
  return (
    <Button
      disabled={disable || loading}
      onClick={onClick}
      variant="contained"
      color={color}
      type={type || "button"}
      sx={{
        ...Style.button,
        backgroundColor: (disable || loading) && "#EDEFFF !important",
        color: disable && `${COLORS.grey} !important`,
        "&:hover": {
          ...hoverSx,
          color: "#3447D4",
          backgroundColor: '#fff'
        },
        ...sx,
      }}
    >
      {!loading ? (
        !icon && !rightIcon ? (
          <Typography sx={{
            ...Style.buttonText, ...typSx, color: "inherit" }}>{buttonText}</Typography>
        ) : (
          <>
            {!!icon && icon}
            <Typography sx={{
              ...Style.buttonText, ...typSx, color: "inherit" }}>{buttonText}</Typography>
            {!!rightIcon && rightIcon}
          </>
        )
      ) : (
        <CircularProgress size={30} />
      )}
    </Button>
  );
};

export default CustomButton;
