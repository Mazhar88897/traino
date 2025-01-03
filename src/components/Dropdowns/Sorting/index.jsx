import SortIcon from "@mui/icons-material/Sort";
import { Box, Button, ClickAwayListener, Typography } from "@mui/material";
import Fade from "@mui/material/Fade";
import React from "react";
import Menu from "../../Menu";

const SortingDropdown = ({
  Style,
  anchorEl,
  setAnchorEl,
  sortOpen,
  setSortOpen,
  sortFunc,
  sort,
  setSort,
}) => {
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSortOpen(false);
  };

  const changeSortCat = (sortCat) => {
    setSortOpen(false);
    setAnchorEl(false);
    sortFunc(sortCat);
  };

  const onMouseOverFunc = (item) => {
    setSortOpen(true);
    setSort(item?.val);
  };

  const sortCat1 = [
    { name: "Ascending", val: "asc" },
    { name: "Descending", val: "desc" },
  ];

  const sortCat2 = [
    { name: "Name", val: "name" },
    { name: "Id", val: "id" },
    { name: "Created At", val: "created_at" },
    { name: "Updated At", val: "updated_at" },
  ];

  const onBlur = () => {
    setSortOpen(false);
    setAnchorEl(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={Style.sortMain}>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={Style.sortButton}
        >
          <SortIcon />
          <Typography>Sort</Typography>
        </Button>
        {open && (
          <Menu
            top={"50px"}
            onBlur={onBlur}
            left={"0"}
            width={"75px"}
            sortCat={sortCat1}
            isArrow={true}
            anchorEl={anchorEl}
            open={open}
            sort={sort}
            setSort={setSort}
            Fade={Fade}
            onMouseOver={onMouseOverFunc}
          />
        )}
        {!!sortOpen && (
          <Menu
            top={"50px"}
            onBlur={onBlur}
            onClickFunc={changeSortCat}
            left={"145px"}
            width={"90px"}
            sortCat={sortCat2}
            isArrow={false}
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            sort={sort}
            setSort={setSort}
            Fade={Fade}
            onMouseOver={onMouseOverFunc}
          />
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SortingDropdown;
