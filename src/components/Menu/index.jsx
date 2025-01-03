import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Style } from "./style";

const Menu = ({
  onClickFunc,
  left,
  width,
  sort,
  isArrow,
  sortCat,
  onMouseOver,
}) => {
  return (
    <Box sx={Style.main(isArrow, left, sort)}>
      {sortCat?.map((item, index) => (
        <Typography
          key={index}
          sx={Style.sortContent}
          onClick={() => !isArrow && onClickFunc(item?.val)}
          onMouseOver={() => isArrow && onMouseOver(item)}
        >
          <Typography component={"span"} width={width}>
            {item?.name}
          </Typography>
          {isArrow && sort !== item?.val && (
            <ArrowForwardIosIcon sx={Style.icon} />
          )}
        </Typography>
      ))}
    </Box>
  );
};
export default Menu;
