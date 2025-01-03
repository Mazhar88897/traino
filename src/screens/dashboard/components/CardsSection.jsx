import React from "react";
import { Box } from "@mui/material";
import CustomCard from "../../../components/CustomCard";
import { Style } from "./style";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slice/user";

const CardsSection = () => {
  const { isSuperAdmin, isAdmin } = useSelector(selectUser);
  const data = [
    { title: isSuperAdmin ? "Total Companies" : isAdmin ? "Total Admins" : "Quizzes Attempts", count: 5 },
    { title: isSuperAdmin ? "Total Admins" : isAdmin ? "Total Users" : "Training Attends", count: 3 },
    {
      title: isSuperAdmin ? "In Active Admins" : isAdmin ? "Total Departments" : "Unfinished Courses",
      count: 5,
    },
  ];
  return (
    <Box sx={Style.cardContainer}>
      {data.map(({ title, count }, index) => (
        <Box key={index} sx={Style.cardItem}>
          <CustomCard heading={title} subHeading={count} />
        </Box>
      ))}
    </Box>
  );
};

export default CardsSection;
