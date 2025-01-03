import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AddDepartmentModal,
  CustomButton,
  DeleteModal,
  Loader,
  NoRecordFound,
  PreviewCards,
} from "../../../components";
import { onScroll } from "../../../components/SelctMenu/helper";
import { handleError } from "../../../hooks/globalFunction";
import {
  deleteDepartments,
  getDepartments,
} from "../../../services/departments";
import { getDepartmentsById } from "../../../services/myLearnings";
import { selectdrawer } from "../../../store/slice/drawer";
import {
  deleteDepartment,
  selectUser,
  updateUserData,
} from "../../../store/slice/user";
import { IMAGES } from "../../../theme";
import CompanyWrapper from "../../companies/summary/CompanyWrapper";
import { Style } from "../style";
import AddIcon from "@mui/icons-material/Add";
import useWindowDimensions from "../../../hooks/windowDimensions";


const TrainingDepartments = ({open, setOpen}) => {
  const state = useLocation()?.state;
  const data = state?.data || {};
  const { paramsId } = useParams();
  const {
    departments,
    access,
    isSuperAdmin,
    isAdmin,
    isUser,
    role,
    id,
    company_id,
    member_id,
  } = useSelector(selectUser);
  const { drawer } = useSelector(selectdrawer);
  const [editItem, setEditItem] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const { width } = useWindowDimensions();
  const headingData = isSuperAdmin ? [
    {
      name: `Companies >`,
      handleNavigate: () => navigate(`/trainings`),
    },
    {
      name: `${data?.name} > Departments`,
    },
  ] : [{
    name: "My Trainings >",
    handleNavigate: () =>
      isAdmin ? navigate(`/trainings/`) : navigate(`/my-learning/`),
  },
  {
    name: "Departments",
    handleNavigate: () =>
      isAdmin ? navigate(`/trainings/`) : navigate(`/my-learning/`),
  },]

  const deletDepartment = async () => {
    try {
      setDelLoading(true);
      await deleteDepartments(dispatch, navigate, openDeleteModal, access);
      toast.success("Department deleted successfully");
      dispatch(deleteDepartment(openDeleteModal));
      setDepartmentData((prev) =>
        prev?.filter((item) => item?.id != openDeleteModal)
      );
      setDelLoading(false);
      setOpenDeleteModal(false);
      setEditItem(false);
    } catch (err) {
      toast.error(
        handleError({ department_id: openDeleteModal }, err?.response?.data)
      );
      setEditItem(false);
      setDelLoading(false);
    }
  };

  const departmentGet = async () => {
    setLoading(true);
    let companyId = isSuperAdmin ? paramsId : company_id;
    if ((isSuperAdmin && !!id) || isAdmin) {
      if (departments?.id != companyId && companyId) {
        const res = await getDepartments(dispatch, navigate, access, companyId);
        if (!!res?.data) {
          let departments = res?.data;
          departments.id = companyId;
          dispatch(updateUserData({ departments }));
          setDepartmentData(res?.data?.results);
        }
      } else setDepartmentData(departments?.results);
    } else {
      const res = await getDepartmentsById(
        dispatch,
        navigate,
        access,
        member_id
      );
      dispatch(
        updateUserData({
          departments: res?.data,
        })
      );
      setDepartmentData(res?.data?.results);
    }
    setLoading(false);
  };

  useEffect(() => {
    departmentGet();
  }, []);

  const onClose = () => {
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    setDepartmentData(departments?.results);
  }, [departments]);

  return (
    <>
      {loading ? (
        <Loader
          style={{
            height: "unset",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          isCircular={true}
        />
      ) : !departmentData?.length ? (
        <NoRecordFound />
      ) : (
        <Box>
          <InfiniteScroll
            dataLength={!!departmentData && departmentData.length}
            next={() =>
              onScroll(
                navigate,
                departments,
                access,
                dispatch,
                setDelLoading,
                company_id,
                setDepartmentData,
                departmentData
              )
            }
            hasMore={!!departments?.next}
            loader={
              <Box sx={Style.progressContainer}>
                <CircularProgress size={50} color="secondary" />
              </Box>
            }
            style={{
              overflow: "inherit",
              flexGrow: 1, width: "100%", display: 'flex', boxSizing: 'border-box'
            }}
          >
            <Box sx={Style.cardWrapper(drawer, false, width)}>
              {departmentData?.map((val, index) => (
                <PreviewCards
                  key={index}
                  data={val}
                  isDownload={false}
                  isDelete={isAdmin}
                  isEdit={isAdmin}
                  editIconClick={() => {
                    setOpen(true)
                    setEditItem({ item: val, index: index })}
                  }
                  setEditItem={setEditItem}
                  editItem={editItem}
                  index={index}
                  deleteIconClick={() => setOpenDeleteModal(val?.id)}
                />
              ))}
            </Box>
          </InfiniteScroll>
        </Box>
      )}
      <AddDepartmentModal
        open={open}
        setOpen={setOpen}
        setDepartmentData={setDepartmentData}
        editData={editItem}
        setEditData={setEditItem}
      />
      <DeleteModal
        onConfirm={deletDepartment}
        onClose={onClose}
        open={!!openDeleteModal}
        setOpen={setOpenDeleteModal}
        loading={delLoading}
        component={"department"}
      />
      </>
  );
};

export default TrainingDepartments;
