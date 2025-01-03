import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ProgressBar from "../../../components/progressBar";
import { IMAGES } from "../../../theme";

const TeamProgressTable = ({ isDashboard }) => {
  const rows = isDashboard
    ? [
      {
        id: 1,
        departments: "Design Department",
        noOfTrainings: "02/12 Completed",
        progress: "75",
      },
      {
        id: 2,
        departments: "Marketing Department",
        noOfTrainings: "09/12 Completed",
        progress: "75",
      },
      {
        id: 3,
        departments: "HR Department",
        noOfTrainings: "11/12 Completed",
        progress: "85",
      },
      {
        id: 4,
        departments: "Finance Department ",
        noOfTrainings: "06/12 Completed",
        progress: "85",
      },
    ]
    : [];

  const columns = [
    {
      field: "departments",
      headerName: "Departments",
      flex: 1,
      maxWidth: isDashboard ? 460 : 520,
      minWidth: isDashboard ? 260 : 270,
      sortable: false,
      renderCell: (params) => (
        <Typography
          component={"span"}
          style={{
            marginRight: "8px",
            display: "flex",
            fontFamily: "Rubik",
            marginTop: "12px",
            color: '#141414',
            fontFamily: 'Rubik',
            fontSize: {xs: '14px', xl: '16px'},
            fontWeight: '400',
          }}
        >
          {params.value}
        </Typography>
      ),
      headerClassName: "leaderboard-header",
    },
    {
      field: "noOfTrainings",
      headerName: "No of Trainings",
      flex: 1,
      maxWidth: isDashboard ? 360 : 540,
      minWidth: isDashboard ? 180 : 270,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: isDashboard ? "start" : "start",
            alignItems: "center",
            height: "50px",
            color: '#4B4B4B',
            textAlign: 'center',
            fontFamily: 'Rubik',
            fontSize: {xs: '14px', xl: '16px'},
            fontWeight: '400',
          }}
        >
          <Typography
            sx={{
              color: "#4B4B4B",
              fontFamily: "Rubik",
              fontSize: isDashboard ? "14px" : "18px",
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
      field: "trainees",
      headerName: "Trainees",
      flex: 1,
      maxWidth: isDashboard ? 260 : 430,
      minWidth: isDashboard ? 130 : 215,
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Box
          sx={{ width: {xs: "90px", xl: '96px'}, height: {xs: "48px", xl: '51px'}, objectFit: "contain" }}
          component={"img"}
          src={IMAGES.usersAvatar}
        />
      ),
    },

    {
      field: "progress",
      headerName: "Progress",
      flex: 1,
      maxWidth: isDashboard ? 300 : 400,
      minWidth: isDashboard ? 150 : 200,
      sortable: false,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            lineHeight: '48px',
            gap: '10px'
          }}
        >
          <Typography component={"span"} sx={{
            lineHeight: '48px',
            color: '#4B4B4B',
            fontFamily: 'Rubik',
            fontSize: {xs: '14px', xl: '16px'},
            fontWeight: '400',
          }}>
            {params.value}%
          </Typography>
          <ProgressBar dots={15}
            width={5.5}
            height={4.5}
          />
        </Typography>
      ),
      headerClassName: "leaderboard-header",
    },
  ];

  return (
    <Box
      sx={{
        padding: isDashboard ? "10px 20px" : "0",
        boxShadow: '0px 4px 39px 0px rgba(81, 69, 159, 0.08)',
        borderRadius: "12px",
        backgroundColor: "#fff",
        mt: 2,
        overflow: "hidden",
        height: "378px",
      }}
    >
      {isDashboard && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="4px"
          pb="12px"
        >
          <Typography
            variant="h6"
            sx={{
              color: "#1F1F1F",
              fontFamily: "Rubik",
              fontSize: "20px",
              fontWeight: "500",
              mt: 3,
              pl: 1
            }}
          >
            Team Progress
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
            flexGrow: 0.35,
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
            pt: '20px',
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "400",
            height: '40px !important'
          },
          "& .MuiDataGrid-topContainer": {
            height: '40px !important'
          },
          "& .leaderboard-header": {
            display: "flex",
            width: "100%",
            justifyContent: "center !important",
            justifySelf: "center !important",
            alignSelf: "center !important",
            alignItems: "center !important",
            lineHeight: '40px',
            height: '40px !important',
            color: '#141414',
            fontFamily: 'Rubik',
            fontSize: '16px',
            fontWeight: '400',
            letterSpacing: '0.08px',
            border: 'none !important',
            outline: "none !important",
            "@media screen and (min-width: 1536px)": {
              fontSize: '18px'
            },
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            display: "flex",
            justifyContent: isDashboard ? "start" : "start",
            alignItems: "center",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "0",
          },
          "& .MuiDataGrid-row": {
            "--rowBorderColor": "white",
            borderBottom: "0",
          },
          ".MuiDataGrid-row:hover": {
            backgroundColor: "inherit", // Prevents hover color change
          },
          ".MuiDataGrid-cell:focus": {
            outline: "none", // Removes focus outline on cells
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            height: '40px !important'
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

export default TeamProgressTable;
