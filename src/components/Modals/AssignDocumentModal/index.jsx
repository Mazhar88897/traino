import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
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
import ModalWrapper from "../../ModalWrapper";
import DepartmentSelect from "../../SelctMenu/departmentSelect";
import UserSelect from "../../SelctMenu/userSelect";
import { Style } from "./style";
import { RxCross2 } from "react-icons/rx";
import CloseIcon from "@mui/icons-material/Close";
import CustomFormControl from "../../CustomFormControl";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import useWindowDimensions from "../../../hooks/windowDimensions";
import emailjs from "emailjs-com";

const AssignDocumentModal = ({
  open,
  setOpen,
  selectedDepartment,
  editItem,
  setEditItem,
  documentsData,
  setDocumentsData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [reminderValue, setReminderValue] = useState();
  const [department, setDepartment] = useState({});
  const { file, index, assigned_users, ...others } = editItem;
  // console.log(department);
  const [assignedDepartments, setAssignedDepartments] = useState([]);
  const [files, setFile] = useState(null);
  const [fileName, setFileName] = useState(false);
  const { documents, access, departments } = useSelector(selectUser);
  const [user, setUser] = useState(assigned_users);
  const [userData, setUserData] = useState([]);
  const { departId } = useParams();

  const [emailUserSelect, setEmailUserSelect] = useState([]);

  const handleEmailSubmit = async (e, emailList) => {
    e.preventDefault();
    // setIsSending(true);

    try {
      for (const [email, name] of emailList) {
        const response = await emailjs.send(
          "service_t8srnau",
          "template_dpsymob",
          {
            to_name: name,
            to_email: email,
          },
          "yD2XGJhCWpvQvaZIR"
        );
        console.log(
          `Email sent to ${name} (${email}):`,
          response.status,
          response.text
        );
      }
      // alert("All emails sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send some emails. Please try again later.");
    } finally {
      // setIsSending(false);
    }
  };
  // const handleEmailSubmit = async (e, list) => {
  //   e.preventDefault();
  //   // setIsSending(true);

  //   try {
  //     const response = await emailjs.send(
  //       "service_t8srnau",
  //       "template_dpsymob",
  //       {
  //         to_name: "Mazhar",
  //         to_email: "mk0906145@gmail.com",
  //       },
  //       "yD2XGJhCWpvQvaZIR"
  //     );
  //     alert("Email sent successfully!");
  //     console.log("Success:", response.status, response.text);
  //   } catch (error) {
  //     console.error("Failed to send email:", error);
  //     alert("Failed to send email. Please try again later.");
  //   } finally {
  //     // setIsSending(false);
  //   }
  // };

  const reminderArray = [
    { name: "Daily", id: "daily" },
    { name: "3 days in a Week", id: "3_days_a_week" },
    { name: "Weekly", id: "weekly" },
    { name: "Monthly", id: "monthly" },
  ];
  const { height, width } = useWindowDimensions();

  const handleClick = (e) => {
    setReminderValue(e?.target?.value);
  };

  const handleChange = (file) => {
    if (!editItem?.file) {
      setFileName(file?.name?.split(".pdf")[0]);
      setFile(file);
    }
  };

  useEffect(() => {
    setFileName(file?.name?.split(".pdf")[0]);
  }, [file]);

  const handleSubmit = async () => {
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
    !!departmentIds?.length
      ? departmentIds?.map((val, index) => {
          payload.append(`department_ids[${index}]`, val);
        })
      : payload.append(`department_ids[0]`, departId);
    updateData[`department_ids`] = departmentIds?.length
      ? departmentIds
      : [departId];
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
        if (!!tempData?.data) {
          const data = { ...tempData?.data };
          dispatch(updateDocument({ data, index: index }));
          let temp = { ...documentsData };
          let results = [...temp?.results];
          results[index] = data;
          temp.results = results;
          setDocumentsData(temp);
          setEditItem(false);
        }
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
      console.log("yea hai :", updateData);
      console.log("data payload : ", payload);
      // console.log("updated userdata list", userData);
      toast.success(
        `Document successfully ${!editItem ? "uploaded" : "updated"}`
      );
      handleClose();
    } catch (err) {
      console.log("ERR: ", err);
      toast.error(handleError({}, err?.response?.data));
      setLoader(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setDepartment({});
    setAssignedDepartments([]);
    setOpen(false);
    setEditItem(false);
    setUser([]);
    setUserData([]);
    setLoader(false);
    setReminderValue("");
  };

  useEffect(() => {
    setDepartment({
      data: !!Object?.values(selectedDepartment)?.length
        ? [selectedDepartment]
        : [],
    });
  }, [selectedDepartment]);

  useEffect(() => {
    if (!!editItem) {
      setDepartment({ data: [editItem] });
      // let temp = [...departments?.results]
      // temp?.filter((item) => !!file?.departments?.includes(item?.id))
      // setAssignedDepartments([...temp]);
      setUser(assigned_users);
    }
  }, [editItem]);

  const isFile = files || file;
  const isAssignAble = true;
  return (
    <ModalWrapper
      open={!!open}
      setOpen={setOpen}
      sx={Style.wrapper(isAssignAble, height)}
    >
      <Box sx={Style.container(isAssignAble)}>
        {/* left section */}
        {isAssignAble && (
          <Box sx={Style.leftSide}>
            <Box sx={Style.leftSideChild}>
              <Box sx={Style.actionBtn}>
                <RxCross2 onClick={handleClose} />
              </Box>
              <Box sx={Style.selectMain}>
                <Box sx={Style.selectContainer}>
                  <Typography sx={Style.select}></Typography>
                  <Typography sx={Style.enroll}>
                    Enroll the Trainee in your training
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    maxWidth: "200px",
                    height: "50px",
                    "& .Mui-focused > .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4156F9 !important",
                      borderWidth: "1px !important",
                      outline: "none",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4156F9 !important",
                    },
                  }}
                >
                  <DepartmentSelect
                    sx={{
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      mb: 0,
                      "&::placeholder": {
                        color: "#1F1F1F",
                      },
                    }}
                    setDepartment={setDepartment}
                    department={department}
                    selectedDepartment={selectedDepartment}
                    editItem={editItem}
                    assignedDepartments={assignedDepartments}
                    setAssignedDepartments={setAssignedDepartments}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={Style.contentContainerChild}>
                  <Box sx={Style.userSearchContainer}>
                    <Box sx={Style.userDetailContainer}>
                      <Typography sx={Style.userNo}>
                        Trainers {userData?.results?.length}
                      </Typography>
                    </Box>
                    <Box sx={Style.paperFormContainer}>
                      <Paper
                        // component="form"
                        sx={Style.paperForm}
                      >
                        <IconButton
                          type="button"
                          sx={Style.searchContainer}
                          aria-label="search"
                        >
                          <Box
                            component={"img"}
                            src={IMAGES.search}
                            sx={Style.searchIcon}
                          />
                        </IconButton>
                        <InputBase
                          sx={Style.inputBase}
                          placeholder={`Search Trainee`}
                          inputProps={{ "aria-label": "Search" }}
                        />
                      </Paper>
                    </Box>
                    <Box
                      sx={Style.enrollMain}
                      onClick={() => {
                        let tempData = ["all"];
                        userData?.results?.map((item) => {
                          tempData?.push(item?.id);
                        });
                        setUser(tempData);
                      }}
                    >
                      <Box
                        component={"img"}
                        src={IMAGES.user}
                        width={"23px"}
                        height={"21px"}
                      />
                      <Typography sx={Style.enroll}>Enroll all</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: { xs: "100%", sm: "40%" },
                      maxWidth: "205px",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component={"img"}
                      src={IMAGES.bell}
                      width={"23px"}
                      height={"23px"}
                      ml={1.25}
                    />
                    <CustomFormControl
                      sx={{
                        pb: "-16px !important",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                          outline: "none !important",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            border: "none !important",
                            outline: "none !important",
                          },
                        "& .MuiSvgIcon-root": {
                          color: "#3447D4",
                          width: "26px",
                          height: "26px",
                        },
                      }}
                      selectSx={{
                        height: "35px",
                        color: "#3447D4",
                        fontFamily: "Rubik",
                        fontSize: "18px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                        border: "none !important",
                      }}
                      value={reminderValue}
                      objectKey={"name"}
                      array={reminderArray}
                      handleChange={handleClick}
                      placeholder={"Set Reminder"}
                      id="reminder"
                      customIcon={ArrowDropDownIcon}
                    />
                  </Box>
                </Box>
              </Box>
              <UserSelect
                user={user}
                setUser={setUser}
                userData={userData}
                setUserData={setUserData}
                department={department}
                editItem={editItem}
                emailUserSelect={emailUserSelect}
                setEmailUserSelect={setEmailUserSelect}
              />
            </Box>
          </Box>
        )}
        <Box sx={Style.rightSide}>
          <Box sx={{ ...Style.spaceBetween, ...Style.assignedHeadingMain }}>
            <Box sx={{ ...Style.row, gap: { xs: 1, md: 1.5 } }}>
              <Typography sx={Style.assignedHeading}>
                Assigned Participant
              </Typography>
              <Typography sx={Style.assignedNo}>
                {
                  userData?.results?.filter((item) => user?.includes(item?.id))
                    ?.length
                }
              </Typography>
            </Box>
            <Typography onClick={() => setUser([])} sx={Style.unselect}>
              Unselect all
            </Typography>
          </Box>
          <Box
            sx={{
              color: "#1F1F1F",
              display: "flex",
              gap: "12px 7px",
              my: 2,
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {userData?.results
              ?.filter((item) => user?.includes(item?.id))
              ?.map((item, index) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: "8px 6px 8px 11px",
                    width: width < 360 ? "100%" : "calc(50% - 4px)",
                    minWidth: "150px",
                    maxWidth: { xs: "350px", sm: "200px" },
                    height: "45px",
                    borderRadius: "7px",
                    background: "#FFF",
                    boxSizing: "border-box",
                    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
                    position: "relative",
                  }}
                  onClick={() => {
                    handleChange(item);
                    console.log(item);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      width: "calc(100% - 20px)",
                    }}
                  >
                    <Box
                      sx={{
                        width: "29px",
                        height: "29px",
                        borderRadius: "27px",
                      }}
                      component={"img"}
                      src={
                        index % 3 === 0
                          ? IMAGES.notification1
                          : index % 3 === 1
                          ? IMAGES.notification3
                          : IMAGES.notification4
                      }
                    />
                    <Typography
                      sx={{
                        color: "#1F1F1F",
                        fontFamily: "Rubik",
                        fontSize: "16px",
                        fontWeight: "400",
                        height: "25px",
                        lineHeight: "25px",
                        overflow: "hidden",
                        width: "100%",
                        // display: 'flex',
                        // flexGrow: 1,
                        // width: 'calc(100% - 280px) !important',
                        height: "26px",
                        lineHeight: "26px",
                        display: "inline",
                        wordBreak: "break-all",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item?.first_name + " " + item?.last_name}
                    </Typography>
                  </Box>
                  <CloseIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setUser((prev) =>
                        prev?.filter((item2) => item2 !== item?.id)
                      )
                    }
                  />
                </Box>
              ))}
          </Box>
          <Box sx={{ ...Style.buttonsContainer, mt: "auto" }}>
            <CustomButton
              sx={Style.button}
              loading={loader}
              color="secondary"
              buttonText={"Assign Trainees"}
              onClick={(e) => {
                console.log("xxxxxxxxxxxx", userData.results);
                const emails = userData.results.map((item) => [
                  item.email,
                  item.first_name,
                ]);

                handleEmailSubmit(e, emails);
                handleSubmit();
                //
              }}
              disable={
                !!editItem
                  ? !department?.data?.length && !isFile
                  : !department?.data?.length || !isFile
              }
            />
          </Box>
        </Box>
      </Box>
    </ModalWrapper>
  );
};
export default AssignDocumentModal;
