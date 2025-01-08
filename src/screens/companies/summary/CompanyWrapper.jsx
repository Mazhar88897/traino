import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomButton, TopBanner } from "../../../components";
import Layout from "../../../layout/MainLayout";
import { selectUser } from "../../../store/slice/user";
import { globalStyle } from "../../../styles/globalStyle";
import { tabsArray } from "../../training/helper";
import { selectdrawer } from "../../../store/slice/drawer";
import { IMAGES } from "../../../theme";
import { Style } from "./style";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import AddIcon from "@mui/icons-material/Add";
import { allQuizzez } from "../../../store/slice/quizzez";
import useWindowDimensions from "../../../hooks/windowDimensions";

const CompanyWrapper = ({
  children,
  heading,
  headingData,
  headingNavigation,
  topBannerIcon,
  topBannerHeading,
  isTabs,
  handleBack,
  isButton,
  buttonText,
  buttonSx,
  buttonTypSx,
  buttonClickHandling,
  buttonIcon,
  topBannerContent,
  topBannerContent2,
  percentage,
  hideHeader,
  setOpen,
}) => {
  const navigate = useNavigate();
  const { drawer } = useSelector(selectdrawer);
  const { id, departId, docId, section } = useParams();
  const { isSuperAdmin, isAdmin, isUser } = useSelector(selectUser);
  const location = useLocation();
  const path = location?.pathname?.split("/");
  const state = location?.state;
  const selectedDocData = location?.state?.val;

  const quizData = state?.quizData;

  const goBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  const [tab, setActiveTab] = useState(location?.search?.split("?=")[1]);
  const tabs = tabsArray({
    id,
    departId,
    docId,
    navigate,
    isSuperAdmin,
    isAdmin,
    state,
  });
  const isTabShown = isTabs && section !== "quizResult";
  const { quizzezList } = useSelector(allQuizzez);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setActiveTab(section);
  }, [location]);

  const isActiveCondition = (val) => {
    const item = val?.tabName?.toLowerCase()?.replace(" ", "");
    const selectedTab = tab?.toLowerCase()?.replace(" ", "");
    return (
      item === selectedTab ||
      (item === "quiz" && selectedTab === "attemptquiz") ||
      (item === "quiz" && selectedTab === "quizzes")
    );
  };

  const defaultImageUrl = useMemo(() => {
    return IMAGES.companyLogo2;
  }, []);

  return (
    <Layout>
      {section && !section.includes("quizResult") ? (
        <Box sx={Style.header(section === "attemptQuiz")}>
          <Box
            component={"img"}
            sx={{
              width: "23px",
              height: "22px",
              display: { sm: "none", lg: "none", xl: "none" },
            }}
            src={IMAGES.whiteBack}
            onClick={() => {
              let ind = tabs?.findIndex((val) => isActiveCondition(val));
              if (
                section === "attemptQuiz" ||
                section === "quizResult" ||
                section === "uploadQuiz"
              )
                handleBack();
              else if (isTabs && ind != -1) {
                tabs[ind].handleBack();
              } else navigate(-1);
            }}
          />

          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2, // Limit text to 2 lines
              WebkitBoxOrient: "vertical", // Control text orientation
              whiteSpace: "normal", // Allow line wrapping
              wordBreak: "break-all",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={Style.trainingHeading} component={"span"}>
              Training:
            </Typography>

            <Typography sx={Style.trainingName} component={"span"}>
              {selectedDocData?.name}
            </Typography>
          </Typography>
          {section === "attemptQuiz" && (
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "70px", sm: "90px", md: "90px" },
                maxHeight: { xs: "70px", sm: "90px", md: "90px" },
                mx: { xs: "auto" },
              }}
            >
              <CircularProgressbar
                value={percentage + 1}
                text={
                  <Typography
                    component={"tspan"}
                    sx={{
                      color: "#FFF",
                      fontFamily: "Rubik",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                    x="50%"
                    dy="0"
                  >
                    {`${percentage}%`}
                  </Typography>
                }
                styles={buildStyles({
                  rotation: 0,
                  pathColor: `#35C354`,
                  trailColor: "#F3F3F2",
                  backgroundColor: "#F3F3F2",
                  textColor: "#fff",
                  fontWeight: "700",
                })}
                strokeWidth={10}
              />
            </Box>
          )}

          {/* {section === "quizzes" && isAdmin && (
            <Button
              sx={{
                color: "#fff",
                borderRadius: "8px 8px 0px 0px",
                background: "#1E2265",
                borderRadius: "4px",
                border: "1.5px solid #FFF",
                width: { xs: "100%", md: "40%" },
                minWidth: "150px",
                maxWidth: "250px",
                textTransform: "inherit",
                fontFamily: "Rubik",
                fontSize: "18px",
                fontWeight: "600",
                height: "44px",
                p: 0,
                alignSelf: { xs: "end", md: "center" },
              }}
              onClick={() => {
                navigate(`/trainings/document/${docId}/quiz`, {
                  state,
                });
              }}
            >
              <Typography component={"span"} sx={{ flex: 1 }}>
                Uploaded Quizzes
              </Typography>
              <Typography
                component={"span"}
                sx={{
                  dipslay: "flex",
                  width: "50px",
                  background: "#3447D4",
                  fontSize: "20px",
                  lineHeight: "42px",
                  borderRadius: "4px",
                  height: "40px",
                }}
              >
                {quizzezList.length < 10 ? "0" : ""}
                {quizzezList.length}
              </Typography>
            </Button>
          )}
          {section === "uploadQuiz" && isAdmin && !quizData?.upload_status && (
            <CustomButton
              buttonText={"Upload"}
              sx={{
                display: "flex",
                flex: 1,
                height: "44px",
                maxHeight: "44px !important",
                alignSelf: { xs: "end", md: "center" },
                width: { xs: "50%", md: "40%" },
                maxWidth: { xs: "180px", md: "250px" },
                // minWidth: "150px",
              }}
              onClick={() => setOpen(true)}
            />
          )} */}
        </Box>
      ) : (
        <TopBanner
          headingNavigation={headingNavigation}
          heading={heading}
          headingData={headingData}
          Icon={topBannerIcon}
          text={topBannerHeading}
        />
      )}
      {!!isAdmin &&
        path[1] === "trainings" &&
        path?.length <= 2 &&
        !hideHeader && (
          <Box
            sx={{
              mt: 1.5,
              display: "flex",
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${IMAGES.document}) no-repeat center center`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minHeight: "210px",
              width: {
                xs: "calc(100% + 48px)",
                sm: "calc(100% + 51px)",
                md: "calc(100% + 72px)",
                xl: "calc(100% + 95px)",
              },
              ml: { xs: "-24px", sm: "-25px", md: "-36px", xl: "-39px" },
              alignItems: "center",
              justifyContent: "center",
              px: "36px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "10px",
                py: "20px",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxWidth: { xs: "1290px", xl: "1440px" },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Rubik",
                    fontSize: { xs: "20px", md: "28px" },
                    fontWeight: "600",
                    lineHeight: "38px",
                    width: "100%",
                    maxWidth: "620px",
                  }}
                >
                  Empower Learning: Create Tailored Training Programs for Your
                  Team
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Rubik",
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "500",
                    lineHeight: "38px",
                    mt: 1,
                  }}
                >
                  Create Your Customized Trainings Now
                </Typography>
              </Box>
              <CustomButton
                onClick={() => buttonClickHandling()}
                icon={<AddIcon />}
                buttonText={"Create Training"}
                typSx={{ fontSize: { xs: "14px", md: "16px" } }}
                sx={{
                  color: "#000",
                  background: "#FFF",
                  width: "100%",
                  maxWidth: { xs: "170px", sm: "180px", md: "248px" },
                  height: { xs: "40px", md: "53px" },
                  gap: { xs: "4px", md: "16px" },
                  display: "flex",
                  justifyContent: "start",
                  pl: { xs: 1, sm: 2, md: 3 },
                  display: "flex",
                  alignSelf: { xs: "end", md: "center" },
                  justifySelf: { xs: "end", md: "center" },
                  border: "none",
                  "&:hover": {
                    color: "#000",
                    background: "#FFF",
                  },
                }}
              />
            </Box>
          </Box>
        )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {section !== "attemptQuiz" && !!topBannerHeading && (
          <Box
            sx={globalStyle.HeroBanner(
              section,
              section === "attemptQuiz",
              isTabShown
            )}
          >
            {!!section && (
              <Box
                sx={globalStyle.arrowback}
                component={"img"}
                src={IMAGES.backIcon}
                onClick={() => {
                  let ind = tabs?.findIndex((val) => isActiveCondition(val));
                  if (
                    section === "attemptQuiz" ||
                    section === "quizResult" ||
                    section === "uploadQuiz"
                  )
                    handleBack();
                  else if (isTabs && ind != -1) {
                    tabs[ind].handleBack();
                  } else navigate(-1);
                }}
              />
            )}
            <Box
              sx={globalStyle.tabsMain(
                isTabs,
                drawer,
                section === "attemptQuiz"
              )}
            >
              {isTabShown ? (
                <Box sx={globalStyle.tabsContainer}>
                  {tabs.map((val, index) => (
                    <Box
                      onClick={val.func}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pt: { xs: "4px" },
                        gap: { xs: "8px", sm: "12px", md: "12px" },
                        borderRight: index == 2 ? "0" : "1px solid #F0F0F0",
                        px: "0",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: "23.38px", sm: "30px", md: "30px" },
                          height: { xs: "23.38px", sm: "30px", md: "30px" },
                        }}
                        component={"img"}
                        src={val.src}
                      />
                      <Typography sx={globalStyle.tabs(isActiveCondition(val))}>
                        {val.tabName}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    maxWidth: {
                      xs: section !== "attemptQuiz" ? "1320px" : "1440px",
                      xl: "1470px",
                    },
                    mx: "auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        // xs:
                        //   (isButton || topBannerContent) &&
                        //   (isSuperAdmin || width < (isUser ? 700 : 800))
                        //     ? "column"
                        //     : "row",
                        xs: "row",
                        md: "row",
                      },
                      justifyContent: "space-between",
                      alignItems: "center ",
                      flexWrap: "wrap",
                      gap: { xs: "1px", md: "12px" },
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 3 },
                        whiteSpace: "normal",
                      }}
                    >
                      {path[1] === "company" && path[2] !== "update" && (
                        <Box
                          component={"img"}
                          src={state?.data?.logo || defaultImageUrl}
                          sx={Style.logo}
                        />
                      )}
                      <Box
                        sx={{
                          mx: "auto",
                          width:
                            path[1] === "company" && path[2] != "update"
                              ? {
                                  xs: "calc(100% - 76px)",
                                  sm: "calc(100% - 84px)",
                                  md: "calc(100% - 92px)",
                                }
                              : "100%",
                        }}
                      >
                        <Tooltip title={topBannerHeading}>
                          <Typography
                            onClick={headingNavigation && headingNavigation}
                            sx={{
                              color: "#1F1F1F",
                              fontFamily: "Rubik",
                              fontSize: { xs: "22px", xl: "32px" },
                              fontStyle: "normal",
                              fontWeight: "500",
                              width: "100%",
                              maxWidth: "100%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              lineHeight: "42px",
                              height: "42px",
                              display: "inline",
                            }}
                          >
                            {topBannerHeading}
                          </Typography>
                        </Tooltip>
                        {!!topBannerContent2 && topBannerContent2}
                      </Box>
                    </Box>
                    {!!topBannerContent && topBannerContent}
                    {isButton && (
                      <CustomButton
                        icon={buttonIcon}
                        buttonText={buttonText}
                        sx={buttonSx}
                        typSx={buttonTypSx}
                        onClick={() => buttonClickHandling()}
                      />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={globalStyle.wrapper(section !== "attemptQuiz", height)}>
        {children}
      </Box>
    </Layout>
  );
};

export default CompanyWrapper;
