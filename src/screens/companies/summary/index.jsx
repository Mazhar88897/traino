import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CreateUserAdminModal, CustomTable, Loader } from "../../../components";
import CustomTabs from "../../../components/CustomTabs";
import { selectdrawer } from "../../../store/slice/drawer";
import { selectMyTeams, selectUser } from "../../../store/slice/user";
import { IMAGES } from "../../../theme";
import TrainingDepartments from "../../training/Departments";
import CompanyWrapper from "./CompanyWrapper";
import { Style } from "./style";

const CompanySummary = () => {
  const state = useLocation()?.state;
  const data = state?.data;
  const { id } = useParams();
  const { drawer } = useSelector(selectdrawer);
  const { company_id, isSuperAdmin, isAdmin, user, admin } =
    useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [presentTab, setPresentTab] = useState(isSuperAdmin ? "admin" : "user");
  const [open, setOpen] = useState(false);
  const [createOpenModal, setCreateOpenModal] = useState(false);
  const [editData, setEditData] = useState({});

  const navigate = useNavigate();

  const tabs = isAdmin
    ? [
        { name: "Users", id: "user" },
        { name: "Admins", id: "admin" },
        { name: "Departments", id: "department" },
      ]
    : [
        { name: "Admins", id: "admin" },
        { name: "Users", id: "user" },
      ];

  const headingData = isSuperAdmin
    ? [
        {
          name: `Companies >`,
          handleNavigate: () => navigate(`/companies`),
        },
        { name: `${data?.name}` },
      ]
    : isAdmin && [
        {
          name: `Dashboard >`,
          handleNavigate: () => navigate("/dashboard"),
        },
        {
          name: `My Teams`,
        },
      ];

  const handleEditClick = async (params) => {
    if (params?.row) {
      setCreateOpenModal(true);
      setEditData(params?.row);
    }
  };

  const count = (presentTab === "user" ? user?.count : admin?.count) || 0;

  return (
    <CompanyWrapper
      headingData={headingData}
      topBannerHeading={
        presentTab === "department"
          ? "Departments"
          : isAdmin
          ? "My Teams"
          : data?.name
      }
      topBannerContent2={
        <Typography sx={Style.topBannerContent2}>
          {presentTab === "department" || presentTab === "admin"
            ? "Admin"
            : "User"}{" "}
          Information
        </Typography>
      }
      handleBack={() =>
        isSuperAdmin
          ? navigate(`/companies`, { state })
          : navigate("/dashboard")
      }
      isButton={!loading}
      buttonText={`${
        presentTab === "department" ? "Add" : "Create"
      } ${presentTab}`}
      buttonClickHandling={() => {
        presentTab === "department" ? setOpen(true) : setCreateOpenModal(true);
      }}
      buttonSx={Style.btn}
      buttonIcon={<AddIcon sx={Style.addIcon} />}
    >
      <Box sx={Style.main}>
        <Box sx={Style.tabContainer}>
          <CustomTabs
            tabs={tabs}
            presentTab={presentTab}
            setPresentTab={setPresentTab}
          />
          <Box
            sx={{
              ...Style.searchWrapper,
              p: 0,
              m: 0,
              mr: { xs: 0, md: "-15px" },
            }}
          >
            {presentTab !== "department" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  pr: 2,
                  width: "42%",
                  height: "25px",
                  minWidth: "115px",
                  maxWidth: "150px",
                  borderRight: { md: "1px solid #A5A5A5" },
                }}
              >
                <Box
                  component={"img"}
                  src={IMAGES.totalUser}
                  sx={{ width: "32px", height: "32px" }}
                />
                <Typography
                  sx={{
                    color: "#1F1F1F",
                    fontFamily: "Rubik",
                    fontSize: "18px",
                    fontWeight: "400",
                    opacity: "0.8",
                    minWidth: "100px",
                  }}
                >{`${count} ${
                  presentTab === "user"
                    ? count > 1
                      ? "Users"
                      : "User"
                    : count > 1
                    ? "Admins"
                    : "Admin"
                }`}</Typography>
              </Box>
            )}
            <Paper
              // component="form"
              sx={{
                ...Style.searchWrapper,
                width: presentTab !== "department" ? "58%" : "100%",
                minWidth: { xs: "100px", md: "180px" },
                maxWidth: "250px",
                ml: presentTab !== "department" ? 1 : "auto",
              }}
            >
              <IconButton
                type="button"
                sx={Style.iconButton}
                aria-label="search"
              >
                <Box component={"img"} src={IMAGES.search} sx={Style.search} />
              </IconButton>
              <InputBase
                sx={Style.inputBase}
                placeholder={`Search ${
                  presentTab[0]?.toUpperCase() +
                  presentTab.slice(1, presentTab?.length)
                }..`}
                inputProps={{ "aria-label": "Search" }}
              />
            </Paper>
          </Box>
        </Box>
        {presentTab === "department" ? (
          <TrainingDepartments open={open} setOpen={setOpen} />
        ) : (
          // <div></div>
          <Box sx={!loading && Style.tableContainer(drawer)}>
            {loading ? (
              <Loader style={Style.loader} isCircular={true} />
            ) : (
              <>
                {(id || company_id) && (
                  <CustomTable
                    isuser={presentTab === "user"}
                    handleEditClick={handleEditClick}
                  />
                )}
                <CreateUserAdminModal
                  open={createOpenModal}
                  setOpen={setCreateOpenModal}
                  userRole={
                    presentTab.charAt(0).toUpperCase() + presentTab.slice(1)
                  }
                  data={editData}
                  setData={setEditData}
                />
              </>
            )}
          </Box>
        )}
      </Box>
    </CompanyWrapper>
  );
};

export default CompanySummary;
