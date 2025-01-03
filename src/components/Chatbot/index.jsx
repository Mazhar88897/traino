import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { Style } from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addSummary, getSummary } from "../../services/summary";
import {
  selectSummaryAndKeyPoints,
  selectedDocumentAction,
  addSummaryAction,
  addKeyPointsAction,
} from "../../store/slice/summaryAndKeyPoints";
import { addKeypoints, getKeypoints } from "../../services/keypoints";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserData } from "../../store/slice/user";
import toast from "react-hot-toast";
import { handleError } from "../../hooks/globalFunction";
import { IMAGES } from "../../theme";
import useWindowDimensions from "../../hooks/windowDimensions";

const Chatbot = ({
  notFoundImg,
  step,
  setStep,
  submitQuizLoader,
  isAdminChatbot = false,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedDocData = location?.state?.val;
  const selectedId = selectedDocData?.id;
  const { section } = useParams();
  const { access, isAdmin, isUser, documents } = useSelector(selectUser);
  const { summary, keyPoints, selectedDocument } = useSelector(
    selectSummaryAndKeyPoints
  );
  const [inputVal, setInputVal] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { height } = useWindowDimensions();

  const getData = async (condition) => {
    setLoading(true);
    if (!!section && condition) {
      if (
        (selectedDocument?.is_summary && section == "summary") ||
        (selectedDocument?.is_keypoints && section == "keyPoints") ||
        Object.keys(selectedDocument).length === 0
      )
        getApiFunc()
          .then((data) => {
            setData(data);
            changeInputVal(true);
            setLoading(false);
          })
          .catch(() => {
            setData(
              isAdmin
                ? `To generate ${
                    section == "keyPoints" ? "keypoint" : "summary"
                  } please click below button`
                : `${
                    section == "summary" ? "Summary" : "Keypoint"
                  } has not been generated yet.`
            );
            changeInputVal();
            setLoading(false);
          });
      else {
        setData(
          isAdmin
            ? `To generate ${
                section == "keyPoints" ? "keypoint" : "summary"
              } please click below button`
            : `${
                section == "summary" ? "Summary" : "Keypoint"
              } has not been generated yet.`
        );
        changeInputVal();
        setLoading(false);
      }
    } else setLoading(false);
  };

  useEffect(() => {
    let condition =
      section == "summary"
        ? typeof summary == "string"
          ? !summary
          : !summary?.data
        : typeof keyPoints == "string"
        ? !keyPoints
        : !keyPoints?.data;
    if (condition) getData(condition);
    else {
      changeInputVal();
      setLoading(false);
    }
  }, [section]);

  const changeInputVal = (isEmpty) => {
    let tempData = section === "summary" ? summary : keyPoints;
    // if(!!Object?.values(selectedDocument)?.length ? selectedDocument?.is_quizzes : selectedDocData?.is_quizzes)
    setInputVal(
      (!!tempData?.data && !!tempData?.data[section?.toLowerCase()]) || isEmpty
        ? ""
        : section === "summary"
        ? `You are the content creator , Provide me the descriptive, related and concise and everytime unique summary for:`
        : `You are the key-points generator , Provide me the keypoints in bullet-points, related to the and everytime provide me unique keypoints :`
    );
  };

  const getApiFunc = async () => {
    return section?.toLowerCase() === "summary"
      ? await getSummary(dispatch, navigate, access, `${selectedId}`)
      : await getKeypoints(dispatch, navigate, access, `${selectedId}`);
  };

  const addApiFunc = async () => {
    return section?.toLowerCase() === "summary"
      ? await addSummary(
          dispatch,
          navigate,
          { document: selectedId, prompt: inputVal },
          access
        )
      : await addKeypoints(
          dispatch,
          navigate,
          { document: selectedId, prompt: inputVal },
          access
        );
  };

  const setData = (data) => {
    section?.toLowerCase() === "summary"
      ? dispatch(addSummaryAction(data))
      : dispatch(addKeyPointsAction(data));
  };

  const submit = async (e) => {
    e.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    if (
      !step &&
      typeof step !== "number" &&
      (section === "summary" || section === "keyPoints")
    )
      handleSubmit();
  }, [step, notFoundImg]);

  const handleSubmit = async () => {
    let selectedDocumentObj = { ...selectedDocument };
    if (inputVal?.trim()?.length)
      try {
        setSubmitLoading(true);
        await addApiFunc()
          .then((data) => {
            if (data) {
              dispatch(
                section === "summary"
                  ? addSummaryAction(data)
                  : addKeyPointsAction(data)
              );
              selectedDocumentObj[`is_${section?.toLowerCase()}`] = true;
              dispatch(selectedDocumentAction(selectedDocumentObj));
              let allDocuments = { ...documents };
              let selectedInd = allDocuments?.results?.findIndex(
                (item) => item?.id == selectedDocumentObj?.id
              );
              allDocuments.results = [
                ...allDocuments?.results?.slice(0, selectedInd),
                selectedDocumentObj,
                ...allDocuments?.results?.slice(selectedInd + 1),
              ];
              dispatch(updateUserData({ documents: allDocuments }));
              toast.success("Prompt send successfully");
              setInputVal("");
              setSubmitLoading(false);
            }
          })
          .catch((err) => {
            if (!!err?.response)
              toast.error(handleError({}, err?.response?.data));
            setInputVal("");
            setSubmitLoading(false);
          });
      } catch (err) {
        if (!!err?.response) toast.error(handleError({}, err?.response?.data));
        setSubmitLoading(false);
      }
  };

  let points = [];
  if (!!keyPoints?.data ?? keyPoints?.data[section]) {
    const keyPointsData = keyPoints?.data[section.toLowerCase()];
    points = keyPointsData
      ? keyPointsData.split("\n").filter((line) => line.trim() !== "")
      : [];
  }

  return (
    <Box sx={Style.wrapper(!isAdminChatbot, height)}>
      {!notFoundImg && (
        <Box sx={{ ...Style.titleContainer, justifyContent: "space-between" }}>
          <Box sx={Style.titleContainer}>
            <Box
              sx={{
                width: { xs: "28px", xl: "40px" },
                height: { xs: "25px", xl: "32px" },
              }}
              component={"img"}
              src={IMAGES.infoIcon}
            />
            <Typography sx={Style.title}>
              {section?.charAt(0).toUpperCase() + section?.slice(1)}
            </Typography>
          </Box>
          {/* {(isUser || isAdmin) && <Box component={"img"} src={isUser ? IMAGES.download : IMAGES.edit2} sx={{ width: "39px", cursor: "pointer" }} />} */}
        </Box>
      )}
      <Box sx={Style.dashedBorder(!!notFoundImg)}>
        {notFoundImg && !submitQuizLoader ? (
          notFoundImg
        ) : (
          <Box sx={Style.contentContainer}>
            {loading || submitQuizLoader ? (
              <Box sx={Style.loaderContainer}>
                <CircularProgress size={60} />
              </Box>
            ) : section === "summary" ? (
              <Typography sx={Style.content}>
                {!!summary?.data
                  ? summary?.data[section?.toLowerCase()]
                  : typeof summary == "string" && summary}
              </Typography>
            ) : (
              <Typography sx={Style.content}>
                {!!keyPoints?.data
                  ? points.length
                    ? points?.map((value, index) => (
                        <>
                          <Typography
                            component={"span"}
                            key={index}
                            sx={Style.points}
                          >
                            <Box
                              component="img"
                              src={IMAGES.tick}
                              sx={{
                                position: "absolute",
                                left: "-12px",
                                top: "0px",
                                width: "28px",
                              }}
                            />
                            <Typography
                              sx={Style.pointsPara}
                              component={"span"}
                              key={index}
                            >
                              {value}
                            </Typography>
                          </Typography>
                          <br />
                        </>
                      ))
                    : null
                  : typeof keyPoints == "string" && keyPoints}
              </Typography>
            )}
            {isAdmin && !submitQuizLoader && (
              <Paper component="form" onSubmit={submit} sx={Style.inputWrapper}>
                <InputBase
                  value={
                    (
                      !!Object?.values(selectedDocument)?.length
                        ? selectedDocument[`is_${section?.toLowerCase()}`]
                        : selectedDocData[`is_${section?.toLowerCase()}`]
                    )
                      ? inputVal
                      : ""
                  }
                  onChange={(e) => setInputVal(e?.target?.value)}
                  sx={Style.inputBase}
                  placeholder="Ask here..."
                />
                <Divider sx={Style.divider} orientation="vertical" />
                <IconButton
                  type="submit"
                  color="primary"
                  sx={Style.sendIcon}
                  aria-label="directions"
                  disabled={!inputVal?.trim()?.length}
                >
                  {submitLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Box
                      component={"img"}
                      src={IMAGES.roundUp}
                      sx={{ width: "30px", height: "30px" }}
                    />
                  )}
                </IconButton>
              </Paper>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Chatbot;
