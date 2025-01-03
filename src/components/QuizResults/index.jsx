import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError } from "../../hooks/globalFunction";
import { getQuizResult } from "../../services/quiz";
import { selectdrawer } from "../../store/slice/drawer";
import { selectUser } from "../../store/slice/user";
import { Style } from "./Style";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { IMAGES } from "../../theme";
import CustomPagination from "../CustomPagination";


const QuizResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizId = location?.state?.quizData?.id;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState();
  const { access } = useSelector(selectUser);
  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  const getQuizResultData = async () => {
    if (quizId) {
      try {
        setIsLoading(true);
        const res = await getQuizResult(dispatch, navigate, quizId, access);
        let resData = res?.data?.results;
        resData?.map((item, index) => (item.id = index));
        setData(resData);
      } catch (err) {
        toast.error(
          handleError(
            {},
            err?.response?.data || { error: "Something went wrong" }
          )
        );
      } finally {
        setIsLoading(false);
      }
    }
  };


  useEffect(() => {
    getQuizResultData();
  }, []);


  const columns = [
    {
      field: "user_name",
      headerName: "Trainees",
      flex: 1,
      maxWidth: 170*2,
      minWidth: 170,
      
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            height: "50px",
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            // ml: '15px'
            mx: 'auto'
          }}
        >
          <Avatar src={IMAGES.notification1} alt={params.value} sx={{ width: {xs: '28px', xl: '32px'}, height: {xs: '28px', xl: '32px'} }} />
          <Typography
            component={"span"}
            sx={{
              color: '#141414',
              fontFamily: 'Rubik',
              fontWeight: '400',
              lineHeight: '38px',
              marginRight: "8px",
              display: "flex",
              fontFamily: "Rubik",
              fontSize: {xs: "17px", xl: '18px'},
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
      headerClassName: "leaderboard-header",
    },
    {
      field: "d",
      headerName: "Completion Date",
      flex: 1,
      maxWidth: 160*2,
      minWidth: 160,
      
      sortable: false,
      renderCell: (params) => (
        <Typography
          component={"span"}
          sx={{
            color: '#141414',
            fontFamily: 'Rubik',
            fontWeight: '400',
            lineHeight: '20px',
            mx: 'auto',
            width: 'fit-content',
            // marginRight: "8px",
            display: "flex",
            justifyContent: 'center',
            fontFamily: "Rubik",
            fontSize: {xs: "17px", xl: '18px'},
          }}
        >Oct 14, 2024</Typography>
      ),
      headerClassName: "leaderboard-header",
    },
    {
      field: "a",
      headerName: "Progress",
      flex: 1,
      maxWidth: 180*2,
      minWidth: 180,
      
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
          <Box sx={{ width: '94px', height: '5px', background: '#4FA97C', borderRadius: '8px' }} />
          <Typography
            component={"tspan"}
            sx={{
              color: "#1F1F1F",
              fontFamily: "Rubik",
              fontSize: {xs: "17px", xl: '18px'},
              fontWeight: "400",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            80%
          </Typography>
        </Box>
      ),
    },
    {
      field: "b",
      headerName: "Statistics",
      flex: 1,
      maxWidth: 200*2,
      minWidth: 200,
      
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', mx: 'auto' }}>
          <Typography
            component={"tspan"}
            sx={{
              color: "#1F1F1F",
              fontFamily: "Rubik",
              fontSize: {xs: "17px", xl: '18px'},
              fontWeight: "400",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            2/10 Correct Answer
          </Typography>
        </Box>
      ),
    },
    {
      field: "c",
      headerName: "Total Points",
      flex: 1,
      maxWidth: 160*2,
      minWidth: 160,
      
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Typography
            component={"tspan"}
            sx={{
              color: "#1F1F1F",
              fontFamily: "Rubik",
              fontSize: {xs: "17px", xl: '18px'},
              fontWeight: "400",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            120
          </Typography>
          <Typography
            component={"tspan"}
            sx={{
              color: "#9E9E9E",
              fontFamily: "Rubik",
              fontSize: {xs: "17px", xl: '18px'},
              fontWeight: "400",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            pts
          </Typography>
        </Box>
      ),
    },
    {
      field: "score",
      headerName: "Accuracy",
      flex: 1,
      maxWidth: 115*2,
      minWidth: 115,
      sortable: false,
      headerClassName: "leaderboard-header",
      renderCell: (params) => (
        <Box p='0 9px' sx={{width: '100px', mx: 'auto'}}>
          <CircularProgressbar
            value={params?.value}
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
                    fontSize: {xs: "24px", xl: "26px"},
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
  ];


  return (
    <Box sx={{display: 'flex', flexDirection: "column", flexGrow: 1, flex: 1, width: '100%'}}>
      <Box
        sx={{
          boxShadow: '0px 4px 39px 0px rgba(81, 69, 159, 0.08)',
          borderRadius: "12px",
          backgroundColor: "#fff",
          mt: 2,
          overflow: "hidden",
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '700px'
        }}
      >
        <DataGrid
          rows={data}
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
            maxWidth: '100%',
            flex: 1,
            flexGrow: 1,
            display: 'flex',
            boxSizing: 'border-box',
            overflow: 'auto',
            "& .MuiDataGrid-main": {
              flexGrow: 1,
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
              height: '48px !important',
              background: '#E0E4EA !important',
            },
            "& .MuiDataGrid-columnHeaders>div": {
              height: '48px !important',
              background: '#E0E4EA !important',
            },
            "& .leaderboard-header": {
              display: "flex",
              justifyContent: "center !important",
              justifySelf: "center !important",
              color: '#141414',
              fontFamily: 'Rubik',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '48px',
              letterSpacing: '0.07px',
              height: '48px !important',
              background: '#E0E4EA',
              width: '100%',
              border: 'none !important',
              outline: "none !important",
              "@media screen and (min-width: 1536px)": {
                fontSize: '18px'
              },
            },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              display: "flex",
              outline: 'none',
              border: 'none',
              justifyContent: "center",
              alignItems: "center",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "0",
              display: 'flex',
              alignItems: 'center',
              height: '100px !important',
              maxHeight: '100px !important',
            },
            "& .MuiDataGrid-row": {
              "--rowBorderColor": "white",
              borderBottom: "0",
              height: '100px !important',
              maxHeight: '100px !important',
              borderBottom: '1px solid #E0E4EA',
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
          }}
          checkboxSelection={false}
          isRowSelectable={() => false}
        />
      </Box>
      <CustomPagination currentPage={currentPage} handleChange={handleChange} count={data?.length}/>
    </Box>
  );
};

export default QuizResults;
