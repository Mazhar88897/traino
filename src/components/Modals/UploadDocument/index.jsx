import { Box, Button, FormControl, FormHelperText, InputAdornment, InputBase, InputLabel, OutlinedInput, styled, TextareaAutosize, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../../hooks/globalFunction";
import { addDocuments, updateDocuments } from "../../../services/myLearnings";
import {
  addDocument,
  selectUser,
  updateDocument,
} from "../../../store/slice/user";
import { globalStyle } from "../../../styles/globalStyle";
import { IMAGES } from "../../../theme";
import CustomButton from "../../CustomButton";
import SetReminder from "../../Dropdowns/SetReminder";
import ModalWrapper from "../../ModalWrapper";
import DepartmentSelect from "../../SelctMenu/departmentSelect";
import UserSelect from "../../SelctMenu/userSelect";
import { Style } from "./style";
import UploadDocumentContent from "./uploadDocumentContent";

const UploadDocumentModal = ({
  open,
  setOpen,
  selectedDepartment,
  editItem,
  setEditItem,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [reminder, setReminder] = useState(null);
  const [reminderValue, setReminderValue] = useState("");
  const [department, setDepartment] = useState([selectedDepartment]);
  const [assignedDepartments, setAssignedDepartments] = useState([]);
  const { file, index, ...others } = editItem;
  const [files, setFile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [fileName, setFileName] = useState(false);
  const [inputName, setInputName] = useState("");
  const { documents, access } = useSelector(selectUser);
  const reminderDropdown = Boolean(reminder);
  const [photo, setPhoto] = useState(false);
  const [user, setUser] = useState([]);
  const { departId } = useParams()

  const reminderoptions = {
    daily: "Daily",
    "3_days_a_week": "3 days in a Week",
    weekly: "Weekly",
    monthly: "Monthly",
  };

  const handleReminderClick = (event) => {
    setReminder(event.currentTarget);
  };
  const handleReminderClose = () => {
    setReminder(null);
  };
  const handleClick = (key) => {
    setReminderValue(key);
    setReminder(null);
  };

  const handleChange = (file) => {
    if (!editItem?.file) {
      setFileName(file?.name?.split(".pdf")[0]);
      setInputName(file?.name?.split(".pdf")[0]);
      setFile(file);
    }
  };

  useEffect(() => {
    setFileName(file?.name?.split(".pdf")[0]);
    setInputName(file?.name?.split(".pdf")[0]);
  }, [file]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      setFileName(inputName);
      setEdit(false);
    } else setEdit(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const departmentIds = assignedDepartments
      ?.filter((item) => !!item?.id)
      ?.map((item) => item.id);
    const payload = new FormData();
    let updateData = {};

    if (files) {
      payload.append("file", files);
      payload.append(
        "name",
        `${fileName != files?.name ? fileName : files?.name}.pdf`
      );
      updateData.file = files;
    }
    updateData.name = `${fileName != files?.name ? fileName : files?.name}.pdf`;
    if (!!reminderValue) {
      payload.append("schedule_frequency", reminderValue);
      updateData.schedule_frequency = reminderValue;
    }
    if (!!user && !user?.includes("all")) {
      payload.append("all", false);
      updateData.all = false;
      user?.map((item, index) => {
        payload.append(`assigned_users[${index}]`, item);
      });
      updateData[`user_ids`] = user;
    } else {
      payload.append("all", true);
      updateData.all = true;
    }
    if (!!departmentIds?.length)
      departmentIds?.map((val, index) => {
        payload.append(`department_ids[${index}]`, val);
      });
    else payload.append(`department_ids[0]`, departId)
    updateData[`department_ids`] = !!departmentIds?.length ? departmentIds : [];
    try {
      setLoader(true);
      if (editItem) {
        const tempData = await updateDocuments(
          dispatch,
          navigate,
          updateData,
          open?.id,
          access
        );
        const data = { ...tempData?.data };
        if (!!tempData?.data) dispatch(updateDocument({ data, index: index }));
        setEditItem(false);
      } else {
        const { data } = await addDocuments(
          dispatch,
          navigate,
          payload,
          access
        );
        let tempData = {
          file: files,
          name: fileName != files?.name ? fileName : files?.name,
          id: data?.created_documents[0],
        };
        const check = documents?.results?.findIndex(
          (item) => item?.name == files?.name
        );
        let isPresent = check + 1;
        if (!isPresent) dispatch(addDocument(tempData));
      }
      toast.success(
        `Document successfully ${!editItem ? "uploaded" : "updated"}`
      );
      handleClose();
    } catch (err) {
      toast.error(handleError({}, err?.response?.data));
      setLoader(false);
    }
  };

  const handleCancel = () => {
    if (!edit) {
      setFile(null);
    }
    setEdit(false);
  };

  const handleClose = () => {
    setFile(null);
    setDepartment({ data: [selectedDepartment] });
    setOpen(false);
    setEditItem(false);
    setEdit(false);
    setUser([]);
    setLoader(false);
    setReminderValue("");
  };

  useEffect(() => {
    setDepartment({ data: [selectedDepartment] });
  }, [selectedDepartment]);

  useEffect(() => {
    if (!!editItem) {
      setDepartment({ data: [editItem] });
      setReminderValue(reminderoptions[editItem?.file?.schedule_frequency]);
    }
  }, [editItem]);

  const isFile = files || file;
  const isAssignAble =
    editItem && editItem?.file?.is_keypoints && editItem?.file?.is_summary;


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
    <ModalWrapper isCloseAble={true} setData={setEditItem} open={!!open} setOpen={setOpen} sx={Style.main}>
      <UploadDocumentContent
        assignedDepartments={assignedDepartments} 
        setAssignedDepartments={setAssignedDepartments}
        open={open}
        setOpen={setOpen}
        selectedDepartment={selectedDepartment}
        editItem={editItem}
        setEditItem={setEditItem}

      />
    </ModalWrapper>
  );
};
export default UploadDocumentModal;
