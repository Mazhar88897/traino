import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { PreviewCards } from "../../../components";
import { learningData } from "../../../helper/helper";
import { selectdrawer } from "../../../store/slice/drawer";
import { globalStyle } from "../../../styles/globalStyle";
import { Style } from "../style";

const Document = ({ handleClick }) => {
  const { drawer } = useSelector(selectdrawer);
  return (
    <>
      <Box sx={{ ...globalStyle.wrapper, margin: "auto" }}>
        <Box sx={Style.cardWrapper(drawer)}>
          {learningData.map((val, index) => (
            <PreviewCards
              isDownload={false}
              key={index}
              data={val}
              handleClick={() => handleClick(val)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Document;
