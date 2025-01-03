import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Style } from "./style";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import useWindowDimensions from "../../../hooks/windowDimensions";

const TrainignMetrics = ({ isDashboard }) => {
  const { width } = useWindowDimensions()
  const rows = isDashboard
    ? [
      {
        id: 1,
        trainingsStatistics: "Advanced Compensation\n98/125 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 2,
        trainingsStatistics: "Pay Management\n26/86 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 3,
        trainingsStatistics: "Compensation Solutions\n18/43 Trainees ",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "20",
        result: "90",
      },
      {
        id: 4,
        trainingsStatistics: "Incentive Insights\n15/27 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
    ]
    : [
      {
        id: 1,
        trainingsStatistics: "Advanced Compensation\n98/125 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 2,
        trainingsStatistics: "Pay Management\n26/86 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 3,
        trainingsStatistics: "Compensation Solutions\n18/43 Trainees ",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 4,
        trainingsStatistics: "Incentive Insights\n15/27 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 5,
        trainingsStatistics: "Advanced Compensation\n98/125 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 6,
        trainingsStatistics: "Pay Management\n26/86 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 7,
        trainingsStatistics: "Compensation Solutions\n18/43 Trainees ",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
      {
        id: 8,
        trainingsStatistics: "Incentive Insights\n15/27 Trainees",
        assignedDate: "Oct 12, 2024",
        pastDue: "Oct 12, 2024",
        status: "70",
        result: "90",
      },
    ];
  const navigate = useNavigate();

  const columns = [
    {
      field: "trainingsStatistics",
      headerName: "Trainings Statistics",
      flex: 1,
      maxWidth: isDashboard ? 500 : 540,
      minWidth: isDashboard ? 250 : 270,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            height: "50px",
            flexDirection: "column", // Stack the lines vertically
          }}
        >
          {params.value.split("\n").map((line, index) => (
            <Typography
              key={index}
              component={"span"}
              sx={{
                color: index === 1 ? "#4B4B4B" : '#141414',
                fontFamily: 'Rubik',
                fontWeight: '400',
                lineHeight: '20px',
                marginTop: index === 1 ? {xs: '4px', xl: '7px'} : {xs: "12px", xl: '13px'},
                marginRight: "8px",
                display: "flex",
                fontFamily: "Rubik",
                fontSize: index === 1 ? {xs: "14px", xl: '15px'} : {xs: "16px", xl: '17px'},
              }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      ),
      headerClassName: "leaderboard-header",
    },
    {
      field: "assignedDate",
      headerName: "Assigned Date",
      flex: 1,
      maxWidth: isDashboard ? 250 : 540,
      minWidth: isDashboard ? 125 : 270,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "50px",
            pt: '5px'
          }}
        >
          <Typography
            sx={{
              color: "#1F1F1F",
              fontFamily: "Rubik",
              fontSize: isDashboard ? {xs: "16px", xl: '17px'} : "18px",
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
      field: "pastDue",
      headerName: "Past Due",
      width: isDashboard ? 125 : 215,
      flex: 1,
      maxWidth: isDashboard ? 250 : 430,
      minWidth: isDashboard ? 125 : 215,
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Typography sx={Style.course(isDashboard, params?.row?.status < 50)}>{params?.value}</Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      maxWidth: isDashboard ? 120 : 300,
      minWidth: isDashboard ? 75 : 150,
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Box pt={0.5} sx={{width: {xs: "50px", xl: '55px'}}}>
          <CircularProgressbar
            value={60}
            text={
              <Typography
                component={"tspan"}
              >
                <Typography
                  component={"tspan"}
                  x="50%"
                  dy="0"
                  sx={{
                    color: "#1F1F1F",
                    fontFamily: "Rubik",
                    fontSize: "26px",
                    fontWeight: "500",
                    letterSpacing: "0.5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {params?.value}%
                </Typography>
              </Typography>
            }
            styles={buildStyles(Style.circularProgressbar(params?.value > 50))}
            strokeWidth={8}
          />
        </Box>
      ),
    },
    {
      field: "result",
      headerName: "Result",
      flex: 1,
      maxWidth: isDashboard ? 140 : 400,
      minWidth: isDashboard ? 70 : 200,
      sortable: false,
      renderCell: (params) => (
        <Typography
          sx={{
            height: "50px",
            color: "#4B4B4B",
            fontFamily: "Rubik",
            fontSize: {xs: "16px", xl: '17px'},
            fontWeight: "500",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {params?.value}%
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
        height: {xs: "378px", xl: '390px'},
      }}
    >
      {isDashboard && (
        <Box
          sx={{mb: {xl: 0.75},
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          mt:"4px"
        }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#1F1F1F",
              fontFamily: "Rubik",
              fontSize: {xs: "20px", xl: '22px'},
              fontWeight: "500",
            }}
          >
            Training Metrics
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isDashboard ? "center" : "start",
              borderRadius: "4px",
              border: "1px solid #CDCDCD",
              width: {xs: "76px", xl: '82px'},
              height: {xs: "36px", xl: '38px'},
              color: "#4156F9",
              fontFamily: "Rubik",
              fontSize: {xs: "12px", xl: '14px'},
              fontWeight: "500",
              lineHeight: "20px",
              cursor: "pointer",
              mr: { xs: 0, sm: '13px', md: '26px', lg: '38px' }
            }}
            onClick={() => navigate('/my-teams')}
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
            flexGrow: 0.68,
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
            height: '40px !important'
          },
          "& .MuiDataGrid-topContainer": {
            height: '40px !important'
          },
          "& .leaderboard-header": {
            display: "flex",
            justifyContent: "start !important",
            justifySelf: "start !important",
            color: '#141414',
            fontFamily: 'Rubik',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '40px',
            letterSpacing: '0.07px',
            height: '40px !important',
            border: 'none !important',
            outline: "none !important",
            "@media screen and (min-width: 1536px)": {
              fontSize: '15px'
            },
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            display: "flex",
            outline: 'none',
            border: 'none',
            justifyContent: "start",
            alignItems: "center",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "0",
            height: '68px !important',
            maxHeight: '68px !important',
          },
          "& .MuiDataGrid-row": {
            "--rowBorderColor": "white",
            borderBottom: "0",
            height: '68px !important',
            maxHeight: '68px !important',
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

export default TrainignMetrics;
