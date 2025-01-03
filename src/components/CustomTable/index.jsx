import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, CircularProgress, Pagination, Stack, Typography } from "@mui/material";
import { DataGrid, GridColumnMenu } from "@mui/x-data-grid";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins, getUsers } from "../../services/companies";
import { getTeamsList, selectUser } from "../../store/slice/user";
import DeleteModal from "../Modals/Delete";
import { handleDeleteTeam, handlePagination, handleSort } from "./helper";
import { Style } from "./style";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomPagination from "../CustomPagination";
import { IMAGES } from "../../theme";
const CustomTable = ({ isuser, handleEditClick }) => {
  const dispatch = useDispatch();
  const state = useLocation()?.state;
  const [isItemSelected, setIsItemSelected] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setCompany] = useState({ loading: true });
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    access,
    company_id,
    isSuperAdmin,
    company_name,
    isAdmin,
    admin_id,
    user,
    admin,
    departments,
  } = useSelector(selectUser);
  const isButtonVisible = !isuser;
  let teams = isuser ? { ...user } : { ...admin };
  const FetchCompany = async () => {
    setIsLoading(true);
    if (
      !teams?.id ||
      (!!id && teams?.id != id) ||
      (!!company_id && teams?.id != company_id)
    ) {
      let results = isuser
        ? await getUsers(dispatch, navigate, id || company_id, access, 1, "id")
        : await getAdmins(dispatch, navigate, company_id || id, access, 1, "id");
      results.data.id = id ? id : company_id;
      results.data.status = [{ pgNo: 0, sort: "id" }];
      results?.data?.results?.map((item2) =>
        Object?.entries(item2)?.map((item) => {
          if (
            item[0] == "first_name" ||
            item[0] == "last_name" ||
            item[0] == "email"
          )
            return (item2[(isuser ? "members__" : "admin__") + item[0]] =
              item[1]);
        })
      );
      setCompany(results?.data);
      dispatch(
        getTeamsList({ role: isuser ? "user" : "admin", data: results?.data })
      );
    } else setCompany(teams);
    setLoading(false);
    setTimeout(() => setIsLoading(false), 300);
  };
  useEffect(() => {
    FetchCompany();
  }, [isuser]);
  useEffect(() => {
    setIsLoading(true);
    teams.results = teams.results?.filter(
      (_, index) =>
        teams?.results?.length <= 10 ||
        (index > Number(pageNo) * 10 - 1 && index < (Number(pageNo) + 1) * 10)
    );
    setCompany(teams);
    setTimeout(() => setIsLoading(false), 300);
  }, [user, admin]);
  const columns = isButtonVisible
    ? [
      {
        field: `admin__first_name`,
        headerName: "First Name",
        flex: 1,
        maxWidth: 300*2,
        minWidth: 300,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ width: '45px', height: '45px', borderRadius: '45px' }} component={"img"} src={IMAGES.notification1} />
            <Typography sx={{ fontFamily: 'Rubik', fontSize: '16px' }}>{params.value}</Typography>
          </Box>
        )
      },
      {
        field: `admin__last_name`,
        headerName: "Last Name",
        flex: 1,
        maxWidth: 250*2,
        minWidth: 250,
        sortable: true,
      },
      {
        field: `admin__email`,
        headerName: "Email",
        flex: 1,
        maxWidth: 330*2,
        minWidth: 330,
        sortable: true,
      },
      {
        field: "customIcon",
        headerName: "Actions",
        renderCell: (params) => (
          <Box sx={Style.buttonContainer}>
            <Box component={"img"} src={IMAGES.edit1}
              onClick={() => handleEditClick(params)}
              style={{ ...Style.cursor, width: '28px' }}
            />
            <Box component={"img"} src={IMAGES.deleteIcon1}
              style={{ ...Style.cursor, width: '28px' }}
              onClick={() => {
                setIsItemSelected([params?.row?.id])
                setOpen(true)
              }}
            />
          </Box>
        ),
        flex: 1,
        maxWidth: 135*2,
        minWidth: 135,
        sortable: false,
      },
    ]
    : [
      {
        field: `members__first_name`,
        headerName: "First Name",
        flex: 1,
        maxWidth: 250*2,
        minWidth: 250,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ width: '45px', height: '45px', borderRadius: '45px' }} component={"img"} src={IMAGES.notification1} />
            <Typography sx={{ fontFamily: 'Rubik', fontSize: '16px' }}>{params.value}</Typography>
          </Box>
        )
      },
      {
        field: `members__last_name`,
        headerName: "Last Name",
        flex: 1,
        maxWidth: 180*2,
        minWidth: 180,
        sortable: true,
      },
      {
        field: `members__email`,
        headerName: "Email",
        flex: 1,
        maxWidth: 230*2,
        minWidth: 230,
        sortable: true,
      },
      {
        field: `departments_names`,
        headerName: "Departments",
        flex: 1,
        maxWidth: 190*2,
        minWidth: 190,
        sortable: true,
      },
      {
        field: "customIcon",
        headerName: "Actions",
        renderCell: (params) => (
          <Box sx={Style.buttonContainer}>
            <Box component={"img"} src={IMAGES.edit1}
              onClick={() => handleEditClick(params)}
              style={{ ...Style.cursor, width: '28px' }}
            />
            <Box component={"img"} src={IMAGES.deleteIcon1}
              style={{ ...Style.cursor, width: '28px' }}
              onClick={() => {
                setIsItemSelected([params?.row?.id])
                setOpen(true)
              }}
            />
          </Box>
        ),
        flex: 1,
        maxWidth: 135*2,
        minWidth: 135,
        sortable: false,
      }
    ]
  const rows = data?.results || []
  const formattedRows = rows.map((row) => ({
    ...row,
    departments_names: isuser ? row?.departments_names?.join(", ") : [],
  }));
  const CustomNoRowsOverlay = (load) => {
    if (load)
      return <Box sx={Style.noRowsOverlay}><CircularProgress /></Box>
    else
      return (
        <Box sx={Style.noRows}>
          No rows
        </Box>
      );
  };
  const [filterModel, setFilterModel] = useState({
    items: [
      {
        field: isuser ? 'members__first_name' : 'admin__first_name', 
        operator: 'isNotEmpty',  // Just use a "contains" operator to always show the filter icon
        value: '',   // No filter value applied, just to show the icon
      },
    ],
  });
  useEffect(() => {
    setFilterModel({
      items: [
        {
          field: isuser ? 'members__first_name' : 'admin__first_name', 
          operator: 'isNotEmpty',  // Just use a "contains" operator to always show the filter icon
          value: '',   // No filter value applied, just to show the icon
        },
      ],
    })
  },[isuser])
  return (
    <Box sx={Style.main(data?.results)}>
      <DataGrid
        sx={Style.tableContainer}
        rows={isuser ? formattedRows : rows}
        filterModel={filterModel}
        columns={columns.map(col => ({
          ...col,
          disableColumnMenu: true,  // Disable the column menu for each column
        }))}
        pagination={false}
        checkboxSelection={true}
        isRowSelectable={(params) => params.id !== admin_id}
        // onCellClick={(params) => {
        //   setIsItemSelected((prev) => !!prev?.includes(params?.row?.id) ? prev?.filter((item) => item != params.row.id) :  [...prev, params.row.id]);
        // }}
        loading={isLoading ? isLoading : data?.loading}
        slots={{
          noRowsOverlay: () =>
            CustomNoRowsOverlay(isLoading ? isLoading : data?.loading),
        }}
        rowCount={data?.count || 0}
        selectionModel={isItemSelected}
        sortingMode="server"
        onSortModelChange={(newModel) => {
          let teams = isuser ? user : admin;
          if (!!teams?.results?.length)
            handleSort(
              newModel,
              isuser,
              access,
              setIsLoading,
              data,
              setSort,
              company_id || id,
              pageNo,
              dispatch,
              isuser,
              teams,
              navigate
            );
        }}
        hideFooter
      // components={{
      //   ColumnMenu: GridColumnMenu, // Ensures the icon appears
      // }}      
      />
      <CustomPagination
        count={Math.ceil(data?.count / 10)}
        handleChange={(_, value) => {
          if (teams) {
            handlePagination(
              navigate,
              value - 1,
              access,
              dispatch,
              setIsLoading,
              isuser,
              id,
              company_id,
              data,
              sort,
              setPageNo
            );
          }
        }}
        currentPage={pageNo + 1}
      />
      <DeleteModal
        onConfirm={() =>
          handleDeleteTeam(
            setCompany,
            access,
            dispatch,
            isItemSelected,
            setIsItemSelected,
            setLoading,
            setOpen,
            isuser,
            navigate,
          )
        }
        currentPage={pageNo}
        onClose={() => setOpen(false)}
        open={open}
        setOpen={setOpen}
        loading={loading}
        component={isuser ? "user" : "admin"}
        isTable={true}
      />
    </Box>
  );
};
export default CustomTable;