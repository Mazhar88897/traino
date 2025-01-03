import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ProgressBar from "../../../components/progressBar";
import { IMAGES } from "../../../theme";
import { useNavigate } from "react-router-dom";

const TopCompaniesTable = ({ isDashboard }) => {
    const navigate = useNavigate()
    const rows = isDashboard
        ? [
            {
                id: 1,
                departments: "Tech Labs",
                noOfTrainings: "54",
                hours: "60",
                progress: "75",
                percentage: "95%"
            },
            {
                id: 2,
                departments: "Afiniti Tech",
                noOfTrainings: "54",
                hours: "55",
                progress: "75",
                percentage: "85%"
            },
            {
                id: 3,
                departments: "Tech Labs",
                noOfTrainings: "54",
                hours: "50",
                progress: "85",
                percentage: "80%"
            },
        ]
        : [];

    const columns = [
        {
            field: "departments",
            headerName: "Companies",
            flex: 1,
            maxWidth: isDashboard ? 330 : 470,
            minWidth: isDashboard ? 165 : 270,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box component={"img"} src={IMAGES.techLogo} sx={{ width: {xs: '39px', xl: "42px"}, height: {xs: '32px', xl: "35px"}, mt: 1 }} />
                    <Typography
                        component={"span"}
                        style={{
                            marginRight: "8px",
                            display: "flex",
                            fontFamily: "Rubik",
                            marginTop: "12px",
                            color: '#1F1F1F',
                            fontFamily: 'Rubik',
                            fontSize: {xs: '16px', xl: '18px'},
                            fontWeight: '500',
                        }}>
                        {params.value}
                    </Typography>
                </Box>
            ),
            headerClassName: "leaderboard-header",
        },
        {
            field: "noOfTrainings",
            headerName: "Trainings uploaded",
            flex: 1,
            maxWidth: isDashboard ? 320 : 470,
            minWidth: isDashboard ? 160 : 270,
            sortable: false,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: isDashboard ? "center" : "start",
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
                            color: "#1F1F1F",
                            fontFamily: "Rubik",
                            fontSize: {xs: isDashboard ? "14px" : "18px", xl: isDashboard ? "16px" : "20px"},
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
            field: "hours",
            headerName: "Total time spent",
            flex: 1,
            maxWidth: isDashboard ? 330 : 470,
            minWidth: isDashboard ? 165 : 270,
            sortable: false,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: isDashboard ? "center" : "start",
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
                            color: "#1F1F1F",
                            fontFamily: "Rubik",
                            fontSize: isDashboard ? {xs: "14px", xl: '16px'} : {xs: "18px", xl: '20px'},
                            fontWeight: "400",
                        }}
                    >
                        {params.value} Hours
                    </Typography>
                </Box>
            ),
            headerClassName: "leaderboard-header",
        },
        {
            field: "percentage",
            headerName: "Productivity",
            flex: 1,
            maxWidth: isDashboard ? 240 : 470,
            minWidth: isDashboard ? 120 : 270,
            sortable: false,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: isDashboard ? "center" : "start",
                        alignItems: "center",
                        height: "50px",
                        color: '#4B4B4B',
                        textAlign: 'center',
                        fontFamily: 'Rubik',
                        fontSize: {xs: '14px', xl: "16px"},
                        fontWeight: '400',
                        gap: '8px'
                    }}
                >
                    <Typography
                        sx={{
                            color: "#1F1F1F",
                            fontFamily: "Rubik",
                            fontSize: {xs: isDashboard ? "16px" : "18px", xl: isDashboard ? "18px" : "20px" },
                            fontWeight: "500",
                        }}
                    >
                        {params.value}
                    </Typography>
                    <Box component={"img"} src={IMAGES.superAdminProgress} sx={{ width: {xs: "17px", xl: '20px'}, height: {xs: '17px', xl: '20px'} }} />
                </Box>
            ),
            headerClassName: "leaderboard-header",
        },
        {
            field: "trainees",
            headerName: "All Team",
            flex: 1,
            maxWidth: isDashboard ? 250 : 415,
            minWidth: isDashboard ? 125 : 215,
            sortable: false,
            headerClassName: "leaderboard-header",
            renderCell: (params) => (
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Box
                        sx={{
                            width: {xs: "125px", xl: "130px"}, height: {xs: "30px", xl: "32px"}, objectFit: "contain"
                        }}
                        component={"img"}
                        src={IMAGES.allTeamAvatar}
                    />
                </Box>
            ),
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
                height: "330px",
                minHeight: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {isDashboard && (
                <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"}
                    mt={{ xs: '8px', md: "20px" }} pb="12px"
                >
                    <Typography variant="h6" sx={{
                        color: '#1F1F1F',
                        fontFamily: 'Rubik',
                        fontSize: { xs: '16px', md: '20px', xl: '24px' },
                        fontWeight: '500',
                    }}>Top Performing Companies</Typography>
                    {/* <Typography variant="body2" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isDashboard ? 'center' : 'start',
                        borderRadius: '8px',
                        width: {xs: '80px', md: '100px'},
                        height: '36px',
                        color: '#4156F9',
                        fontFamily: 'Rubik',
                        fontSize: '12px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        cursor: 'pointer',
                        border: '1px solid #CDCDCD',
                    }}
                        onClick={() => navigate('/trainings')}
                    >
                        View All
                    </Typography> */}
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
                    width: '100%',
                    // maxWidth: '750px',
                    display: 'flex',
                    alignSelf: 'center',
                    "& .MuiDataGrid-main": {
                        flexGrow: 1,
                        minHeight: 'fit-content',
                        overflowY: 'hidden !important'
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
                        boxSizing: 'border-box',
                        overflowY: 'none !important',
                        pt: '6px',
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        display: "none",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "400",
                        color: '#4B4B4B',
                        height: '40px !important',
                        width: '100%',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    "& .MuiDataGrid-topContainer": {
                        height: '40px !important',
                        border: 'none'
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
                        color: '#1F1F1F',
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
                    "& .MuiDataGrid-columnHeaderTitleContainerContent": {
                        width: '100%',
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
                        "--rowBorderColor": "#F0F0F0",
                        maxHeight: '64px !important',
                        height: '64px !important',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start'
                    },
                    ".MuiDataGrid-row:hover": {
                        backgroundColor: "inherit", // Prevents hover color change
                    },
                    ".MuiDataGrid-cell:focus": {
                        outline: "none", // Removes focus outline on cells
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f5f5f5",
                        "--rowBorderColor": "none !important",
                        border: "none !important",
                        height: '40px !important'
                    },
                    "& .css-1oudwrl::after": {
                        display: 'none',
                        "--rowBorderColor": "none",
                        border: "none",
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

export default TopCompaniesTable;
