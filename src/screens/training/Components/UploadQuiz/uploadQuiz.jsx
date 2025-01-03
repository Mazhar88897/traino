import {
  Box,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CustomButton,
  Loader,
  NoRecordFound,
  ReuseModal,
} from "../../../../components";
import { selectUser } from "../../../../store/slice/user";
import {
  getQuestionListData,
  handleAnswerChange,
  handleClose,
  handleNext,
  handleOptionChange,
  handlePrevious,
  handleQuestionChange,
  updateQuizData,
  uploadQuizData,
} from "./helper";
import { style } from "./style";
import { Switch, FormControlLabel } from '@mui/material';
import { IMAGES } from "../../../../theme";
import { selectedDocumentAction, selectSummaryAndKeyPoints } from "../../../../store/slice/summaryAndKeyPoints";
import useWindowDimensions from "../../../../hooks/windowDimensions";

const UploadQuiz = ({ data, setQuizId, isNew, setPropList, open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useLocation()?.state;
  const [updateLoader, setUpdateLoader] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  // const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [index, setIndex] = useState(0);
  const selectedIndex = questionsList[index];
  const isLastIndex = index === questionsList.length - 1;
  const { id, docId, departId } = useParams();
  const { isAdmin, access } = useSelector(selectUser);
  const [isToggled, setIsToggled] = useState(false)
  const [formData, setFormData] = useState({
    question: selectedIndex?.question || "",
    options: selectedIndex?.options || [],
    answer: selectedIndex?.answer || "",
  });
  const { selectedDocument } = useSelector(
    selectSummaryAndKeyPoints
  );
  const {height} = useWindowDimensions()

  const handleSubmit = () => {
    !isLastIndex
      ? handleNext({ setIndex })
      : isAdmin && !data?.upload_status
        ? setOpen(true)
        : handleClose({
          isAdmin,
          navigate,
          id,
          departId,
          docId,
          state,
        });
  };
  useEffect(() => {
    getQuestionListData({
      dispatch,
      navigate,
      data,
      access,
      setQuestionsList,
      setLoader,
    });
  }, [data?.id]);

  useEffect(() => {
    if (isNew)
      setPropList(questionsList)
  }, [questionsList])

  useEffect(() => {
    setFormData({
      question: selectedIndex?.question || "",
      options: selectedIndex?.options || [],
      answer: selectedIndex?.answer || "",
    });
  }, [index, questionsList]);

  useEffect(() => {
    if (isNew)
      setQuizId(selectedIndex)
  }, [selectedIndex])

  useEffect(() => {
    setIsChanged(
      formData.question !== selectedIndex?.question ||
      JSON.stringify(formData.options) !==
      JSON.stringify(selectedIndex?.options) ||
      formData.answer !== selectedIndex?.answer
    );
  }, [formData, selectedIndex]);


  const handleToggle = () => {
    setIsToggled((prev) => !prev)
  }

  if (loader) return <Loader style={style.loader} isCircular={true} />;
  return (
    <>
      {!questionsList?.length && !loader ? (
        <NoRecordFound />
      ) : (
        <Box sx={style.wrapper}>
          <Box sx={style.contanier}>
            <Box sx={style.header(height)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box component={"img"} src={IMAGES.questionIcon} sx={{ width: {xs: '25px', xl: '28px'}, height: {xs: '25px', xl: '28px'} }} />
                <Typography sx={style.quizHeading}>
                  {`Question ${index + 1}`}
                </Typography>
              </Box>
              <Box
                sx={style.quizContainer}
              >
                <Typography sx={style.quizHeading}>
                  {`${index + 1}/${questionsList.length}`}
                </Typography>
                <CustomButton
                  onClick={() => {
                    handlePrevious({ setIndex, index });
                  }}
                  disable={!index || updateLoader || isChanged}
                  icon={<GrLinkPrevious size={24} />}
                />
                <CustomButton
                  buttonText={
                    (!isLastIndex || isNew)
                      ? ""
                      : isAdmin && !data?.upload_status
                        ? ""
                        : "Close"
                  }
                  onClick={handleSubmit}
                  icon={(!isLastIndex || (isAdmin && !data?.upload_status) || isNew) && <GrLinkNext size={24} />}
                  disable={updateLoader || isChanged || (isLastIndex && isAdmin && !data?.upload_status) || (isLastIndex && isNew)}
                />
              </Box>
            </Box>
            <Box sx={style.questionSectionWrapper}>
              <Box sx={style.questionSectionContanier}>
                <Box sx={{ px: { xs: 1.5, md: 2 } }}>
                  {!isAdmin && (
                    <Typography sx={style.questionSectionHeader}>
                      {selectedIndex?.question}
                    </Typography>
                  )}
                  <List sx={style.optionListWrapper}>
                    {isAdmin && (
                      <>
                        <ListItem sx={style.optionList(height)}>
                          <Input
                            sx={{
                              color: '#1F1F1F',
                              fontFamily: 'Rubik',
                              fontSize: { xs: '16px', sm: "20px", md: '24px' },
                              fontStyle: 'normal',
                              fontWeight: '500',
                              lineHeight: '36px',
                              "::before": {
                                border: 'none !important'
                              }
                            }}
                            multiline={true}
                            value={formData?.question}
                            onChange={(e) =>
                              handleQuestionChange({ e, setFormData })
                            }
                            fullWidth
                          />
                        </ListItem>
                        {/* <ListItem sx={{ width: '100%', maxWidth: '860px', margin: '0 auto', p: '0 5px', mt: 2 }}>
                          <Typography sx={{
                            color: '#1F1F1F',
                            fontFamily: 'Rubik',
                            fontSize: '18px',
                            fontWeight: '400',
                            lineHeight: '41px',
                            borderRight: '1px solid #BDBDBD',
                            height: "26px",
                            display: 'flex',
                            alignItems: 'center',
                            pr: { xs: 1, sm: 1.5, md: 2, lg: 2.5 }
                          }}>Choices</Typography>
                          <Typography sx={{
                            color: '#1F1F1F',
                            fontFamily: 'Rubik',
                            fontSize: '18px',
                            fontWeight: '400',
                            pl: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
                          }}>Multiple answer</Typography>
                          <FormControlLabel
                            sx={style.labelToggle}
                            control={<Switch name="toggleSwitch" sx={style.toggleStyle(true)} />}
                          />
                        </ListItem> */}
                      </>
                    )}
                    {formData.options.map((option, optionIndex) =>
                      Object.entries(formData.options[0]).map(
                        ([key, value], index) => (
                          <ListItem sx={style.answerContainer(height)}
                          >
                            <Typography sx={style.answerNo(key === formData?.answer, height)}
                              onClick={() => {
                                if (isAdmin) {
                                  let tempFormData = { ...formData }
                                  tempFormData.answer = key
                                  setFormData(tempFormData)
                                }
                              }}
                            >{String.fromCharCode(65 + index)}</Typography>
                            {
                              isAdmin ?
                                <Input
                                  value={value}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      optionIndex,
                                      key,
                                      e.target.value,
                                      setFormData
                                    )
                                  }
                                  fullWidth
                                  sx={{
                                    color: '#1F1F1F',
                                    fontFamily: 'Rubik',
                                    fontSize: {xs: '18px', xl: '20px'},
                                    fontWeight: '400',
                                    lineHeight: '39px',
                                    letterSpacing: '-0.18px',
                                    "::before": {
                                      border: 'none !important'
                                    }
                                  }}
                                /> :
                                <Typography variant="body1" sx={style.answer}>{value}</Typography>}
                          </ListItem>
                        )
                      )
                    )}
                  </List>
                </Box>
              </Box>
              <Box sx={style.bottomBtnWrapper}>
                <Box sx={style.bottomBtnContainer(height)}>
                  {isAdmin && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'end' }}>
                      <Typography sx={{
                        color: '#4B4B4B',
                        fontFamily: 'Rubik',
                        fontSize: {xs: '17px', xl: '18px'},
                        fontWeight: '400',
                        lineHeight: '39px',
                        letterSpacing: '-0.17px',
                        width: {xs: '115px', xl: '120px'},
                        mr: '20px',
                      }}>Each question</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', gap: '16px' }}>
                        <CustomButton
                          disable={!isChanged}
                          buttonText={"Update"}
                          onClick={() =>
                            updateQuizData({
                              dispatch,
                              navigate,
                              setUpdateLoader,
                              selectedIndex,
                              formData,
                              access,
                              questionsList,
                              index,
                              setIsChanged,
                            })
                          }
                          loading={updateLoader}
                        />
                        <Box sx={{ width: {xs: '125px', xl: "130px"}, height: {xs: '36px', xl: '40px'}, display: 'flex', background: "#EEF0FF66", mr: '16px', borderRadius: '5px' }}>
                          <Typography sx={{
                            color: '#1F1F1F',
                            textAlign: 'center',
                            fontFamily: 'Rubik',
                            fontSize: {xs: '16px', xl: '18px'},
                            fontWeight: '400',
                            lineHeight: '39px',
                            letterSpacing: '-0.16px',
                            p: '0 16px 0 12px',
                            borderRight: '2px solid #F1F1F1'
                          }}>10</Typography>
                          <Typography sx={{
                            width: '100%',
                            color: '#1F1F1F',
                            fontFamily: 'Rubik',
                            fontSize: {xs: '14px', xl: '16px'},
                            fontWeight: '400',
                            lineHeight: '39px',
                            letterSpacing: '-0.14px',
                            p: '0 16px 0',
                          }}>Points</Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <ReuseModal
            title={"Are you sure you want to upload quiz ?"}
            open={open}
            setOpen={setOpen}
            onConfirm={() => {
              uploadQuizData({
                dispatch,
                access,
                departId,
                docId,
                state,
                setOpen,
                navigate,
                setUploadLoader,
                setQuestionsList,
                selectedIndex,
              }).then(() => {
                let selectedDocumentObj = { ...selectedDocument };
                selectedDocumentObj.is_quizzes = true;
                dispatch(selectedDocumentAction(selectedDocumentObj));
              })
            }}
            loader={uploadLoader}
          />
        </Box>
      )}
    </>
  );
};

export default UploadQuiz;
