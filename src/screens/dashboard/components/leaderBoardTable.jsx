import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, Avatar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IMAGES } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Style } from "./style";

const LeaderBoardTable = ({ isDashboard }) => {
  const rows = isDashboard
    ? [
        {
          id: 1,
          src: IMAGES.notification1,
          rank: 1,
          name: "Charlie Rawal",
          course: 53,
          hour: "250 hours",
          score: "13.450",
        },
        {
          id: 2,
          src: IMAGES.notification2,
          rank: 2,
          name: "Ariana Kerena",
          course: 88,
          hour: "212 hours",
          score: "10.333",
        },
        {
          id: 3,
          src: IMAGES.notification3,
          rank: 3,
          name: "Louis Botosh",
          course: 85,
          hour: "200 hours",
          score: "9.333",
        },
      ]
    : [
        {
          id: 1,
          src: IMAGES.notification1,
          rank: 1,
          name: "Charlie Rawal",
          course: 53,
          hour: "250 hours",
          score: "13.450",
        },
        {
          id: 2,
          src: IMAGES.notification2,
          rank: 2,
          name: "Ariana Kerena",
          course: 88,
          hour: "212 hours",
          score: "10.333",
        },
        {
          id: 3,
          src: IMAGES.notification3,
          rank: 3,
          name: "Louis Botosh",
          course: 85,
          hour: "200 hours",
          score: "9.333",
        },
        {
          id: 1,
          src: IMAGES.notification1,
          rank: 1,
          name: "Charlie Rawal",
          course: 53,
          hour: "250 hours",
          score: "13.450",
        },
        {
          id: 2,
          src: IMAGES.notification2,
          rank: 2,
          name: "Ariana Kerena",
          course: 88,
          hour: "212 hours",
          score: "10.333",
        },
        {
          id: 3,
          src: IMAGES.notification3,
          rank: 3,
          name: "Louis Botosh",
          course: 85,
          hour: "200 hours",
          score: "9.333",
        },
        {
          id: 1,
          src: IMAGES.notification1,
          rank: 1,
          name: "Charlie Rawal",
          course: 53,
          hour: "250 hours",
          score: "13.450",
        },
        {
          id: 2,
          src: IMAGES.notification2,
          rank: 2,
          name: "Ariana Kerena",
          course: 88,
          hour: "212 hours",
          score: "10.333",
        },
        {
          id: 3,
          src: IMAGES.notification3,
          rank: 3,
          name: "Louis Botosh",
          course: 85,
          hour: "200 hours",
          score: "9.333",
        },
      ];
  const navigate = useNavigate();

  const columns = [
    {
      field: "rank",
      headerName: "Ranks",
      flex: 1,
      maxWidth: isDashboard ? 160 : 280,
      minWidth: isDashboard ? 80 : 140,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "50px",
            justifyContent: isDashboard ? "center" : "start",
            pl: !isDashboard && 1,
          }}
        >
          <Typography
            component={"span"}
            style={{
              marginRight: "8px",
              borderRadius: "5px",
              background: "#F5F7FB",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              fontFamily: "Rubik",
              fontSize: { xs: "12px", xl: "14px" },
              fontWeight: "600",
            }}
          >
            {params.value}
          </Typography>
          {params.value === 1 ? (
            <FaCaretUp style={{ color: "#2DB0A9" }} />
          ) : (
            <FaCaretDown style={{ color: "#F44C75" }} />
          )}
        </Box>
      ),
      headerClassName: "leaderboard-header",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      maxWidth: isDashboard ? 400 : 470,
      minWidth: isDashboard ? 200 : 270,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: isDashboard ? "center" : "start",
            alignItems: "center",
            height: "50px",
          }}
        >
          <Avatar
            src={params.row.src}
            alt={params.value}
            sx={{
              marginRight: isDashboard ? "8px" : "16px",
              width: { xs: "28px", xl: "32px" },
              height: { xs: "28px", xl: "32px" },
            }}
          />
          <Typography
            sx={{
              color: "#1F1F1F",
              fontFamily: "Rubik",
              fontSize: { xs: isDashboard ? "14px" : "18px", xl: "16px" },
              fontWeight: "400",
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
      headerClassName: "leaderboard-header",
    },
    {
      field: "course",
      headerName: "Trainings",
      flex: 1,
      maxWidth: isDashboard ? 330 : 470,
      minWidth: isDashboard ? 160 : 215,
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Typography
          sx={{ ...Style.course(isDashboard), justifyContent: "center" }}
        >
          {params?.value}
        </Typography>
      ),
    },
    {
      field: "hour",
      headerName: "Time Spent",
      flex: 1,
      maxWidth: isDashboard ? 240 : 400,
      minWidth: isDashboard ? 120 : 200,
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Typography
          sx={{
            height: "50px",
            color: "#4B4B4B",
            fontFamily: "Rubik",
            fontSize: { xs: "14px", xl: "16px" },
            fontWeight: "400",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: isDashboard ? "center" : "start",
          }}
        >
          {params?.value}
        </Typography>
      ),
    },
    {
      field: "score",
      headerName: "Total Points",
      flex: 1,
      maxWidth: isDashboard ? 360 : 400,
      minWidth: isDashboard ? 180 : 200,
      sortable: false,
      renderCell: (params) => (
        <Typography
          component={"span"}
          sx={{
            color: "#3447D4",
            display: "flex",
            alignItems: "center",
            justifyContent: isDashboard ? "center" : "start",
            gap: "10px",
            mt: 1,
          }}
        >
          <Box component={"img"} src={IMAGES.point} width="18px" />
          <Typography
            component={"span"}
            sx={{
              color: "#3447D4",
              textAlign: "center",
              fontFamily: "Rubik",
              fontSize: { xs: isDashboard ? "14px" : "17px", xl: "16px" },
              fontWeight: "400",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "5px",
            }}
          >
            {params.value}{" "}
            <Typography
              component={"span"}
              sx={{
                color: "#4B4B4B",
                fontFamily: "Rubik",
                fontSize: { xs: "14px", xl: "16px" },
                fontWeight: "400",
                lineHeight: "26px",
                pt: 0.5,
              }}
            >
              {isDashboard && "pts"}
            </Typography>
          </Typography>
        </Typography>
      ),
      headerClassName: "leaderboard-header",
    },
  ];
  return (
    <Box
      sx={{
        padding: isDashboard ? "10px 20px" : "0",
        boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
        borderRadius: "12px",
        backgroundColor: "#fff",
        mt: 2,
        overflow: "hidden",
        width: { xs: "350px", sm: "100%", md: "100%", lg: "100%" },
        // height: { xs: "329px" },
        // mx: "10px",
      }}
    >
      {isDashboard && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px solid #F0F0F0"
          mt="4px"
          pb="12px"
        >
          <Typography
            variant="h6"
            sx={{
              color: "#1F1F1F",
              fontFamily: "Rubik",
              fontSize: { xs: "20px", xl: "22px" },
              fontWeight: "500",
            }}
          >
            Leader Board
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isDashboard ? "center" : "start",
              borderRadius: "8px",
              border: "1px solid #CDCDCD",
              width: "100px",
              height: "36px",
              color: "#4156F9",
              fontFamily: "Rubik",
              fontSize: { xs: "12px", xl: "14px" },
              fontWeight: "500",
              lineHeight: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/leaderboard")}
          >
            View All
          </Typography>
        </Box>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        pagination={false}
        hideFooter={true} // Hides pagination and page counter
        disableSelectionOnClick={true} // Disables row selection
        disableColumnFilter={true} // Disables filtering
        disableColumnResize={true} // Disables column resizing
        disableColumnReorder={true} // Disables column reordering
        disableColumnMenu={true} // Disables column reordering
        components={{
          Toolbar: null, // Hides the toolbar
        }}
        sx={{
          border: "0",
          "& .MuiDataGrid-main": {
            flexGrow: 0.45,
          },
          "& .MuiDataGrid-scrollbar--vertical": {
            display: "none",
          },
          "& .MuiDataGrid-scrollbar--horizontal": {
            width: "100%",
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "--DataGrid-rowBorderColor": "white !important",
            "--rowBorderColor": "white !important",
            "--DataGrid-cellOffsetMultiplier": "0",
            border: "0",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "400",
          },
          "& .leaderboard-header": {
            color: "#4B4B4B",
            fontFamily: "Rubik",
            fontSize: "16px",
            fontWeight: "400 !important",
            display: "flex",
            width: "100%",
            justifyContent: "center !important",
            justifySelf: "center !important",
            alignSelf: "center !important",
            alignItems: "center !important",
            outline: "none",
            "@media screen and (min-width: 1536px)": {
              fontSize: "18px",
            },
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            display: "flex",
            justifyContent: isDashboard ? "center" : "start",
            alignItems: "center",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "0",
          },
          "& .MuiDataGrid-row": {
            "--rowBorderColor": "white",
            borderBottom: "0",
            marginTop: "5px",
            minHeight: "50px !important",
            maxHeight: "50px !important",
          },
          ".MuiDataGrid-row:hover": {
            backgroundColor: "inherit", // Prevents hover color change
          },
          ".MuiDataGrid-cell:focus": {
            outline: "none", // Removes focus outline on cells
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F5F5F5",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none !important",
          },
          "& .MuiDataGrid-filler": {
            display: "none",
            flexGrow: 0.4,
          },
          "& .MuiDataGrid-row--borderBottom": {
            background: !isDashboard && "#F4F5F7 !important",
          },
        }}
        checkboxSelection={false}
        isRowSelectable={() => false}
      />
    </Box>
  );
};
export default LeaderBoardTable;
