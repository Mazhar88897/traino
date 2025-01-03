import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../../../hooks/globalFunction";
import { createDepartments, updateDepartments } from "../../../services/departments";
import { addDepartment, selectUser, updateUserData } from "../../../store/slice/user";
import CustomButton from "../../CustomButton";
import ModalWrapper from "../../ModalWrapper";
import { Style } from "./style";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../theme";
import { styled } from "@mui/material/styles";

const AddDepartmentModal = ({ open, setOpen, setDepartmentData, editData, setEditData }) => {
  const { access, company_id, departments } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(false);

  useEffect(() => {
    const name = editData?.item?.name
    if (name)
      setDepartmentName(editData?.item?.name)
  }, [editData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!!departmentName.length) {
      const data = {
        name: departmentName,
        company: company_id,
      };
      try {
        setLoading(true);
        if(editData){
            try {
              const { data } = await updateDepartments(
                dispatch,
                navigate,
                { name: departmentName },
                editData?.item?.id,
                access
              );
              let tempData = [...departments?.results];
              tempData[editData?.index] = data;
              dispatch(updateUserData({ departments: { results: tempData } }));
              toast.success("Department updated successfully");
              setEditData(false);
            } catch (err) {
              toast.error(handleError({ name: departmentName }, err?.response?.data));
              setLoading(false);
            }
        
        }
        else {
        const departments = await createDepartments(
          dispatch,
          navigate,
          data,
          access
        );
        dispatch(addDepartment(departments.data));
        setDepartmentData((prev) => [...prev, departments?.data]);
        toast.success("Department has successfully created");
        setDepartmentName("");
      }
        setLoading(false);
        setOpen(false);
      } catch (err) {
        toast.error(handleError(data, err?.response?.data));
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(false)
    setDepartmentName("");
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <ModalWrapper open={!!open} setOpen={setOpen} sx={Style.main}>
      <Box sx={Style.photoContainer}>
        <Box component={"img"} src={!!editData && !photo ? IMAGES.document : (photo || IMAGES.image)} sx={Style.documentImg} />
        <Button
          sx={Style.uploadFile}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<Box component="img" src={IMAGES.thumbnail} sx={Style.thumbnail} />}
        >
          {editData ? "Update" : "Add"} Thumbnail
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              const files = e?.target?.files;
              if (files && files.length > 0) {
                // Get the last selected photo and create a URL for it
                const lastFile = files[files.length - 1];
                const photoURL = URL.createObjectURL(lastFile);
                setPhoto(photoURL);
              }
            }}
            accept="image/*"
          />
        </Button>
      </Box>
      <Box component={"form"} sx={Style.form} onSubmit={handleSubmit}>
        {!editData &&
          <Typography sx={Style.heading}>
            Add Department
          </Typography>
        }
        <FormControl sx={{...Style.formControl, mt: !!editData ? 1.5 : 0}} variant="outlined">
          <InputLabel htmlFor="department" sx={{lineHeight: '50px !important'}}>Name Your Department</InputLabel>
          <OutlinedInput
            value={departmentName}
            id="department"
            type={"text"}
            label="Name Your Department"
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </FormControl>
        <Box sx={Style.buttonsContainer}>
          <CustomButton
            sx={Style.button(true)}
            color="secondary"
            buttonText={"Cancel"}
            onClick={handleClose}
          />
          <CustomButton
            sx={Style.button(false)}
            loading={loading}
            disable={!departmentName.length}
            color="secondary"
            buttonText={!!editData ? "Update" : "Add"}
            type="submitt"
          />
        </Box>
      </Box>
    </ModalWrapper>
  );
};
export default AddDepartmentModal;
