import { Box, Button, FormControl, InputAdornment, OutlinedInput, styled, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../../hooks/globalFunction";
import { addDocuments, updateDocuments } from "../../../services/myLearnings";
import {
    addDocument,
    selectUser,
    updateDocument,
} from "../../../store/slice/user";
import { IMAGES } from "../../../theme";
import CustomButton from "../../CustomButton";
import DepartmentSelect from "../../SelctMenu/departmentSelect";
import { Style } from "./style";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import "./style.css"

const UploadDocumentContent = ({
    open,
    setOpen,
    selectedDepartment,
    editItem = {},
    setEditItem,
    isNew,
    tempFileName,
    setTempFileName,
    assignedDepartments,
    setAssignedDepartments,
    isPage
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [reminderValue, setReminderValue] = useState("");
    const [department, setDepartment] = useState([selectedDepartment]);
    const { file, index, ...others } = editItem;
    const [files, setFile] = useState(null);
    const [fileName, setFileName] = useState(false);
    const [inputName, setInputName] = useState("");
    const { documents, access } = useSelector(selectUser);
    const [photo, setPhoto] = useState(false);
    const [user, setUser] = useState([]);
    const { departId } = useParams()

    const reminderoptions = {
        daily: "Daily",
        "3_days_a_week": "3 days in a Week",
        weekly: "Weekly",
        monthly: "Monthly",
    };


    useEffect(() => {
        if (!!file) {
            if (isNew)
                setTempFileName(file?.name?.split(".pdf")[0])
            setFileName(file?.name?.split(".pdf")[0]);
            setInputName(file?.name?.split(".pdf")[0]);
        }
    }, [file]);

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
            if (!!Object?.values(editItem)?.length) {
                const tempData = await updateDocuments(
                    dispatch,
                    navigate,
                    updateData,
                    editItem?.file?.id,
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


    const handleClose = () => {
        setFile(null);
        setDepartment({ data: [selectedDepartment] });
        setOpen(false);
        setEditItem(false);
        setUser([]);
        setLoader(false);
        setReminderValue("");
    };

    useEffect(() => {
        setDepartment({ data: [selectedDepartment] });
    }, [selectedDepartment]);

    useEffect(() => {
        if (!!Object?.values(editItem)?.length) {
            setDepartment({ data: [editItem] });
            setReminderValue(reminderoptions[editItem?.file?.schedule_frequency]);
        }
    }, [editItem]);


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
        <Box sx={{width: isPage ? {xs: '100%', lg: "50%"} : '100%', minWidth: {lg: "475px"}}}>
            <Box sx={Style.photoContainer}>
                <Box component={"img"} src={!!Object.values(editItem)?.length && !photo ? IMAGES.document : (photo || IMAGES.image)} sx={Style.documentImg} />
                <Button
                    sx={Style.uploadFile}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<Box component="img" src={IMAGES.thumbnail} sx={Style.thumbnail} />}
                >
                    {!!Object.values(editItem)?.length ? "Update" : "Add"} Thumbnail
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                            const files = e?.target?.files;
                            if (files && files.length > 0) {
                                // Get the last selected photo and create a URL for it
                                const lastFile = files[files.length - 1];
                                const photoURL = URL.createObjectURL(lastFile);
                                setPhoto(photoURL); // Update the state with the photo URL
                            }
                        }}
                        accept="image/*"
                    />
                </Button>
            </Box>
            <Box component={"form"} sx={Style.form(isNew)} onSubmit={handleSubmit}>
                <Box sx={Style.formControlContainer}>
                    <Typography sx={Style.heading}>Training Title</Typography>
                    <OutlinedInput
                        value={isNew ? tempFileName : inputName}
                        onChange={(e) => {
                            if (isNew)
                                setTempFileName(e?.target?.value?.split(".pdf")[0])
                            setInputName(e?.target?.value?.split(".pdf")[0])
                        }}
                        sx={{ ...Style.buttonsContainer, ...Style.editInput }}
                        placeholder="Enter File Name"
                    />
                </Box>
                <Box sx={Style.formControlContainer}>
                    <Typography sx={Style.heading}>Overview</Typography>
                    <textarea
                        style={{ ...Style.buttonsContainer, ...Style.textarea }}
                        placeholder="Enter Overview Here"
                    />
                </Box>
                <Box sx={{ ...Style.flexContainer, height: { xs: '178px', md: '82px' } }}>
                    <Box sx={{ ...Style.formControlContainer, height: '80px' }}>
                        <Typography sx={Style.dueDatePara}>
                            <Typography sx={Style.heading} component={"span"}>
                                Due Date
                            </Typography>
                            <Typography sx={{ ...Style.heading, ...Style.optional }} component={"span"}>
                                {`(Optional)`}
                            </Typography>
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                inputFormat="Enter Due Date"
                                sx={{ ...Style.buttonsContainer, ...Style.editInput, ...Style.dateTimePicker }}
                                components={{
                                    OpenPickerIcon: ArrowDropDownIcon,  // Use ArrowDropDown icon
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={Style.formControlContainer}>
                        <Typography sx={Style.heading}>Avg. Completion Time</Typography>
                        <FormControl sx={{ width: { xs: '100%', md: '100%' }, margin: 0, mt: 1 }} variant="outlined">
                            <OutlinedInput
                                sx={{
                                    "& .MuiInputBase-input": {
                                        padding: "12px 14px",
                                        fontFamily: 'Rubik',
                                        color: '#1F1F1F',
                                        fontSize: '18px'
                                    },
                                    borderRadius: "7px !important"
                                }}
                                type="number"
                                id="outlined-adornment-weight"
                                endAdornment={<InputAdornment sx={{ background: "#D1D5F133", borderRadius: '4px', p: '12px 16px', color: '#4B4B4B', opacity: 1, fontFamily: "Rubik", fontSize: '18px' }} position="end">mins</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={Style.formControlContainer}>
                    <Typography sx={Style.heading}>Assign Department</Typography>
                    <DepartmentSelect sx={{ height: '50px', display: 'flex', alignItems: 'center', mb: 0, mt: 1, "& .MuiSvgIcon-root": { fill: '#4B4B4B' }, "& .MuiSelect-select": { textAlign: 'start',
                            color: '#1F1F1F',
                            fontFamily: 'Rubik',
                            fontSize: '18px',
                            fontWeight: '400',                        
                     } }}
                        setDepartment={setDepartment}
                        department={department}
                        selectedDepartment={selectedDepartment}
                        editItem={editItem}
                        assignedDepartments={assignedDepartments}
                        setAssignedDepartments={setAssignedDepartments}
                        noLabel={true}
                    />
                </Box>
                <Box>
                    <Typography sx={Style.heading}>Conclusion</Typography>
                    <Typography component={"ul"} sx={Style.listMain}>
                        <Typography component={"li"} sx={Style.subHeading}>Quiz</Typography>
                        <Typography component={"li"} sx={Style.subHeading}>Summary</Typography>
                        <Typography component={"li"} sx={{ ...Style.subHeading, mr: 0 }}>Key Points</Typography>
                    </Typography>
                </Box>
                {!isNew && <CustomButton type={"submit"} buttonText={"Save Training"} sx={Style.saveButton} />}
            </Box>
        </Box>
    );
};
export default UploadDocumentContent;
