import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CompanyCard, Loader, NoRecordFound } from "../../components";
import { selectUser, updateUserData } from "../../store/slice/user";
import { globalStyle } from "../../styles/globalStyle";
import { IMAGES } from "../../theme";
import { selectdrawer } from "../../store/slice/drawer";
import CompanyWrapper from "../companies/summary/CompanyWrapper";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../../services/auth";
import { getCompanies } from "../../services/companies";
import { onScroll } from "../companies/helper";
import InfiniteScroll from "react-infinite-scroll-component";
import { Style } from "./style";
import useWindowDimensions from "../../hooks/windowDimensions";


const Training = () => {
  const { isSuperAdmin, access, company } = useSelector(selectUser);
  const dispatch = useDispatch();

  const { drawer } = useSelector(selectdrawer);

  const navigate = useNavigate();

  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  const headingData = [
    {
      name: `Trainings >`,
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
      let access = localStorage.getItem("access");
      let refresh = localStorage.getItem("refresh");
      if (!access) {
        const { data } = await refreshToken(dispatch, navigate, { refresh });
        access = data.access;
        localStorage.setItem("access", data.access);
      }

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

  return (
    <CompanyWrapper
      headingData={headingData}
      topBannerContent2={<Typography sx={Style.topBannerContent2}>Company Trainings</Typography>}
      topBannerIcon={IMAGES.training}
      topBannerHeading={"Companies"}
      handleBack={() => navigate("/dashboard")}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: "100%" }}>
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
        ) : companies?.results?.length ? (
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
            style={{ overflow: "visible", flexGrow: 1, width: "100%" }}
          >
            <Box
              sx={{
                ...globalStyle.cardsWrapper(drawer, width),
                alignItems: "flex-start",
              }}
            >
              {companies?.results?.map((val, index) => {
                return (
                  <CompanyCard
                    key={index}
                    data={val}
                    onClick={() =>
                      navigate(`/trainings/company/${val?.id}`, {
                        state: { data: val },
                      })
                    }
                    isDeleteHidden={true}
                    isEditeable={false}
                  />
                );
              })}
            </Box>
          </InfiniteScroll>
        ) : (
          <NoRecordFound />
        )}
      </Box>
    </CompanyWrapper>
  );
};

export default Training;
