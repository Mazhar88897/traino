import AddIcon from "@mui/icons-material/Add";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CompanyCard,
  CustomButton,
  Loader,
  NoRecordFound,
} from "../../components";
import { getCompanies } from "../../services/companies";
import { selectdrawer } from "../../store/slice/drawer";
import { selectUser, updateUserData } from "../../store/slice/user";
import { globalStyle } from "../../styles/globalStyle";
import { IMAGES } from "../../theme";
import CompanyWrapper from "./summary/CompanyWrapper";
import { onScroll } from "./helper";
import InfiniteScroll from "react-infinite-scroll-component";
import { Style } from "../training/style";
import useWindowDimensions from "../../hooks/windowDimensions";

const Companies = () => {
  const navigate = useNavigate();
  const { access, company, isSuperAdmin } = useSelector(selectUser);
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();


  const headingData = [
    {
      name: `Dashboard >`,
      handleNavigate: () => navigate("/dashboard")
    },
    {
      name: `Companies`,
    },
  ];

  const FetchCompanies = async () => {
    if (!!company && !!Object?.values(company)?.length) {
      setCompanies(company);
      setLoading(false)
    }
    else {
      const result = await getCompanies(dispatch, navigate, access);
      dispatch(updateUserData({ company: result?.data }));
      setCompanies(result?.data);
      setLoading(false);
    };
  }

  useEffect(() => {
    setLoading(true)
    FetchCompanies();
  }, []);

  const { drawer } = useSelector(selectdrawer);

  return (
    <CompanyWrapper
      headingData={headingData}
      topBannerIcon={IMAGES.companies}
      topBannerHeading={"Your Companies"}
      topBannerContent2={<Typography sx={Style.topBannerContent2}>Companies Information</Typography>}
      handleBack={() => navigate("/dashboard")}
      isButton={!!isSuperAdmin}
      buttonText={"Add Companies"}
      buttonClickHandling={() => navigate("/companies/add")}
      buttonIcon={<AddIcon />}
      buttonSx={{ width: { xs: '100%', md: '50%' }, maxWidth: '250px', minWidth: '180px', display: 'flex', alignSelf: 'end' }}
    >
      <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {loading ? (
          <Loader
            style={{
              height: "unset",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flex: 1,
              flexGrow: 1
            }}
            isCircular={true}
          />
        ) :
          !!companies?.results?.length ? (
            <InfiniteScroll
              dataLength={!!companies?.result?.length}
              next={() =>
                onScroll(navigate, companies, access, dispatch, setCompanies)
              }
              hasMore={!!companies?.next}
              loader={
                <Box sx={Style.progressContainer}>
                  <CircularProgress size={50} color="secondary" />
                </Box>
              }
              style={{ display: 'flex !important', flexDirection: 'column', flex: 1, flexGrow: 1, width: "100%", overflow: 'visible' }}
            >
              <Box
                sx={{
                  ...globalStyle.wrapper,
                  py: "0px",
                }}
              >
                <Box
                  sx={{
                    ...globalStyle.cardsWrapper(drawer, width),
                    alignItems: "flex-start",
                    flex: 1,
                    flexGrow: 1,
                  }}
                >
                  {companies?.results?.map((val, index) => (
                    <CompanyCard
                      key={index}
                      data={val}
                      onClick={() =>
                        navigate(`/company/${val?.id}`, { state: { data: val } })
                      }
                      setCompanies={setCompanies}
                    />
                  ))}
                </Box>
              </Box>
            </InfiniteScroll>
          ) : (
            <NoRecordFound />
          )}
      </Box>
    </CompanyWrapper>
  );
};

export default Companies;
