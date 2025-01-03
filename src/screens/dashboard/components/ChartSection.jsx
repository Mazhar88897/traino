import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { selectUser } from "../../../store/slice/user";
import RecentActivities from "./RecentActivities";

const ChartSection = () => {
  const { isSuperAdmin, isAdmin } = useSelector(selectUser);
  let admin = isSuperAdmin || isAdmin;

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 150 },
    { name: "Group C", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (
    { cx, cy, midAngle, innerRadius, outerRadius, percent, index },
    e
  ) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const adminData = [
    { title: "Company 1", value: 10 },
    { title: "Company 2", value: 15 },
    { title: "Company 3", value: 20 },
    { title: "Company 4", value: 25 },
  ];
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 320 },
        background: "#e2e4fa",
        borderRadius: 7,
        padding: 3,
        my: 3,
        minHeight: admin ? 450 : 550,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={"bold"}>
          {isSuperAdmin ? "Status" : "Skill Proficiency"}
        </Typography>
      </Box>
      <Box maxHeight={admin ? 180 : 270} width={"100%"} height={"100%"}>
        {admin &&
          adminData.map(({ title }, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>{title}</Typography>
              <Box
                sx={{
                  background: "#e4f1f5",
                  width: "60%",
                  height: 25,
                  mb: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    background: "#6ccdff",
                    width: "20%",
                    height: 25,
                    alignSelf: "flex-end",
                  }}
                />
                <Box
                  sx={{
                    background: "lightblue",
                    width: "35%",
                    height: 25,
                    alignSelf: "flex-end",
                  }}
                />
              </Box>
            </Box>
          ))}
        {!admin && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={isSmScreen ? 100 : 120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <>
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  </>
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>

      <RecentActivities />
    </Box>
  );
};

export default ChartSection;
