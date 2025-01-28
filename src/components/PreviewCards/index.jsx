import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import DoneIcon from "@mui/icons-material/Done";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Input,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../hooks/globalFunction";
import { updateDepartments } from "../../services/departments";
import { selectUser, updateUserData } from "../../store/slice/user";
import { IMAGES } from "../../theme";
import ViewUsers from "../Modals/ViewUsers";
import { Style } from "./style";
import { FiUsers } from "react-icons/fi";
import CustomMenu from "../CustomMenu";
import ProgressBar from "../progressBar";
import CustomButton from "../CustomButton";
import AddIcon from "@mui/icons-material/Add";
import useWindowDimensions from "../../hooks/windowDimensions";
import { selectdrawer } from "../../store/slice/drawer";

// import from prevmodel

// import { selectedDocumentAction } from "../../..";
import { selectedDocumentAction } from "../../store/slice/summaryAndKeyPoints";
import { allQuizzez } from "../../store/slice/quizzez";

const PreviewCards = ({
  isDownload = true,
  data = {},
  // handleClick = () => {},
  deleteIconClick = () => {},
  editIconClick = () => {},
  isEdit,
  isDelete,
  editItem,
  setEditItem,
  index,
  isProgressBar,
  assignClickHandling,
  isCompleted,
}) => {
  const { departId, id } = useParams();
  const location = useLocation();
  const path = location?.pathname?.split("/")[1];
  const { heading, paragraph, date, name, users, is_quizzes } = data;
  const [inputVal, setInputVal] = useState(editItem?.item?.name);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { access, departments, isAdmin, isUser, isSuperAdmin } =
    useSelector(selectUser);
  const dispatch = useDispatch();
  const defaultDepartment = useMemo(() => {
    return IMAGES.department;
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const defaultDocument = useMemo(() => {
    return IMAGES.document;
  }, []);

  useEffect(() => {
    setInputVal(editItem?.item?.name);
  }, [editItem]);

  const updateDepartmentName = async () => {
    try {
      setLoader(true);
      const { data } = await updateDepartments(
        dispatch,
        navigate,
        { name: inputVal },
        editItem?.item?.id,
        access
      );
      let tempData = [...departments?.results];
      tempData[editItem?.index] = data;
      dispatch(updateUserData({ departments: { results: tempData } }));
      if (data?.id) {
        navigate("/trainings/");
      }
      toast.success("Department updated successfully");
      setLoader(false);
      setEditItem(false);
    } catch (err) {
      toast.error(handleError({ name: inputVal }, err?.response?.data));
      setLoader(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    updateDepartmentName();
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    window.open(
      typeof data?.file == "string"
        ? data?.file
        : `https://traino-testing-api.bizaffix.com/media/documents/` +
            data?.name
    );
  };
  const condition = editItem?.index === index && !!editItem;

  const assigned_data = data?.assigned_users_details;
  const { width } = useWindowDimensions();
  const { drawer } = useSelector(selectdrawer);

  // this the preview model part
  const [quizInd, setQuizInd] = useState("0");
  // const [isNext, setIsNext] = useState(true);

  const state = useLocation()?.state;
  const stateData = state?.data || {};

  // const {  } = useParams();

  // const { isSuperAdmin, isAdmin } = useSelector(selectUser);
  const { quizzezList } = useSelector(allQuizzez);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    setQuizInd(event.target.value);
  };

  const handleClick = (lastPath) => {
    dispatch(selectedDocumentAction(data));
    navigate(
      isSuperAdmin
        ? `/trainings/company/${id}/document/${data?.id}/${lastPath}`
        : isAdmin
        ? `/trainings/document/${data?.id}/${lastPath}`
        : `/my-learning/document/${data?.id}/${lastPath}`,
      lastPath === "attemptQuiz" || lastPath === "uploadQuiz"
        ? {
            state: {
              ...state,
              data: stateData,
              val: data,
              departData: state?.departData,
              quizData: quizzezList[quizInd],
            },
          }
        : {
            state: {
              data: stateData,
              val: data,
              departData: state?.departData,
            },
          }
    );
  };
  const dateShow = new Date();

  // Array of month names in uppercase
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  // const date = new Date();
  // Get the required date parts
  const month = dateShow.getMonth();
  const day = dateShow.getDate();
  const year = dateShow.getFullYear();

  // Combine into the desired format
  const dateShown = `${day}-0${month + 1}-${year}`;
  // const date = "hemlo";

  return (
    <>
      <Card sx={Style.main(width, drawer)}>
        {/* {date && (
          <Typography sx={Style.uploadDate}>Uploaded date : {date}</Typography>
        )} */}
        <Box sx={Style.contentContainer}>
          <Box sx={Style.content(path === "trainings" || isUser)}>
            <CardMedia
              component={"img"}
              sx={{
                height: {
                  xs:
                    width < 420 || (drawer ? width > 825 : width > 680)
                      ? path === "trainings" || isUser
                        ? "106px"
                        : "106px"
                      : "106px",
                  xl: path === "trainings" || isUser ? "106px" : "140px",
                },
                background: "none",
                objectFit: "cover",
              }}
              src={
                path === "trainings" || isUser
                  ? defaultDocument
                  : defaultDepartment
              }
            />
          </Box>
          <Box sx={Style.assignButtonContainer}>
            {!isCompleted ? (
              <Box sx={Style.bgAssignButton}>
                <Typography sx={Style.assignBlack}> Due Date: </Typography>
                <Typography sx={Style.assignblue}>{dateShown}</Typography>
                {/* <Typography sx={Style.date}>{dateShow}</Typography> */}
              </Box>
            ) : (
              <Box sx={Style.bgAssignButtonComplete}>
                <Typography sx={Style.assignWhite}>Completed</Typography>
              </Box>
            )}
            {/*
            <Box sx={Style.bgAssignButton}>
               <Typography sx={Style.assignBlack}> Due Date: </Typography>
               <Typography sx={Style.assignblue}>{dateShown}</Typography>
              <Typography sx={Style.date}>{dateShow}</Typography> 
             
            </Box> */}
          </Box>

          <CardContent style={Style.contentBox(path === "trainings" || isUser)}>
            <form
              id={condition && "no_change"}
              onSubmit={submit}
              style={Style.title(path === "trainings" || isUser)}
              onClick={(e) => condition && e.stopPropagation()}
            >
              <Box sx={Style.departContentBox(isAdmin && !departId)}>
                <Tooltip title={heading || name}>
                  <Typography
                    onClick={handleClick}
                    sx={{
                      ...Style.pointerCusrsor,
                      ...Style.heading(path === "trainings" || !isAdmin),
                    }}
                  >
                    {heading || name}
                  </Typography>
                </Tooltip>
              </Box>
              {!departId && (
                <>
                  {isAdmin && (
                    <CustomMenu
                      itemSx={{ display: "flex", gap: 1.5 }}
                      options={[
                        {
                          icon: (
                            <Box
                              component={"img"}
                              src={IMAGES.edit}
                              sx={{
                                ...Style.buttonIcon,
                                ...Style.pointerCusrsor,
                              }}
                            />
                          ),
                          option: "Edit",
                          handleClick: editIconClick,
                        },
                        {
                          icon: (
                            <Box
                              component={"img"}
                              src={IMAGES.delete}
                              sx={{
                                ...Style.buttonIcon,
                                ...Style.pointerCusrsor,
                              }}
                            />
                          ),
                          option: "Delete",
                          handleClick: deleteIconClick,
                        },
                      ]}
                    />
                  )}
                </>
              )}
            </form>
            <Box sx={{ m: (path === "trainings" || isUser) && "2px 0 8px" }}>
              {!isUser && path === "my-teams" && (
                <Box sx={Style.viewBox}>
                  <FiUsers style={Style.userIcon} />
                  <Typography style={Style.userNo}>
                    {users?.length} {users?.length > 1 ? "Members" : "Member"}
                  </Typography>
                </Box>
              )}

              {(path === "trainings" || isUser) && (
                <>
                  <Typography sx={Style.spaceBetween}>
                    <Typography component={"span"} sx={Style.textdescript}>
                      Covers advanced pay and benefits strategies Focuses on
                      performance-based incentives
                    </Typography>
                  </Typography>
                  <Typography sx={{ ...Style.spaceBetween, mt: 1.5, mb: 1.5 }}>
                    <Typography
                      component={"span"}
                      sx={Style.linksOnPreviewCard}
                      onClick={() => handleClick("summary")}
                    >
                      Summary
                    </Typography>
                    <Typography
                      component={"span"}
                      sx={Style.linksOnPreviewCard}
                      onClick={() => handleClick("keyPoints")}
                    >
                      Key Points
                    </Typography>
                    <Typography
                      component={"span"}
                      sx={Style.linksOnPreviewCard}
                      onClick={() => handleClick("quizzes")}
                    >
                      Quiz (02)
                    </Typography>
                    {/* <Typography
                      component={"a"}
                      // onClick={handleOpen}
                      sx={{ ...Style.quizNo, textDecoration: "underline" }}
                    >
                      {`${data?.assigned_users?.length <= 9 ? "0" : ""}${
                        data?.assigned_users?.length || 0
                      }`}
                    </Typography>
                    <Typography
                      component={"a"}
                      onClick={handleOpen}
                      sx={{ ...Style.quizNo, textDecoration: "underline" }}
                    >
                      {`${data?.assigned_users?.length <= 9 ? "0" : ""}${
                        data?.assigned_users?.length || 0
                      }`}
                    </Typography> */}
                  </Typography>
                  <Box>
                    {isProgressBar && (
                      <Box sx={{ ...Style.spaceBetweenBar, mb: "8px" }}>
                        <ProgressBar
                          sx={{ mt: "1px" }}
                          dots={width > 900 ? 14 : width > 600 ? 14 : 14}
                        />

                        <Typography sx={Style.progressBarRatio}>
                          02/04
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      pt: "1px",
                    }}
                  >
                    <Typography sx={Style.estimatedtimetext}>
                      Estimated Completion Time
                    </Typography>
                    <Box sx={Style.stopbox}>
                      <Box
                        component={"img"}
                        src={IMAGES.StopWatch}
                        sx={Style.StopWatch}
                      />
                      <Typography sx={Style.clocktext}>45 mins</Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </CardContent>
          {isDownload && (
            <CardActions
              sx={{
                ...Style.center,
                p: 0,
              }}
            >
              {!isAdmin ? (
                <Box
                  component={"img"}
                  src={IMAGES.download}
                  sx={Style.downloadIcon}
                  onClick={handleDownload}
                />
              ) : (
                <CustomButton
                  onClick={(e) => {
                    e.stopPropagation();
                    assignClickHandling();
                  }}
                  disable={!is_quizzes}
                  sx={{ ...Style.downloadIcon, ...Style.assignButton }}
                  buttonText={"Assign"}
                  icon={<AddIcon />}
                />
              )}
            </CardActions>
          )}
        </Box>
      </Card>
      <ViewUsers open={open} setOpen={setOpen} data={assigned_data} />
    </>
  );
};

export default PreviewCards;
