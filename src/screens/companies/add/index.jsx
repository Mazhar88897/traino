import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layout/MainLayout";
import { IMAGES } from "../../../theme";
import { Style } from "./style";
import { TopBanner } from "../../../components";
import { globalStyle } from "../../../styles/globalStyle";
import AddCompanyForm from "./Form";
import CompanyWrapper from "../summary/CompanyWrapper";

const AddCompany = () => {
  const { id } = useParams();
  const data = useLocation()?.state?.data

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(data?.logo || null);

  // const fileInputRef = useRef(null);

  // const handleFileChange = (event) => {
  //   setSelectedFile(null);
  //   const selectedFile = event.target.files[0];
  //   setSelectedFile(selectedFile);
  // };

  let imgpath =
    selectedFile && typeof selectedFile == "object"
      ? URL.createObjectURL(selectedFile)
      : selectedFile?.includes("http://localhost:8000")
        ? selectedFile.replace(
          "http://localhost:8000",
          "https://tqkvr2f3-8000.inc1.devtunnels.ms"
        )
        : selectedFile;

  const headingData = [
    {
      name: `Dashboard >`,
      handleNavigate: () => navigate("/dashboard")
    },
    {
      name: `Companies >`,
      handleNavigate: () => navigate("/companies")
    },
    { name: `Add Company` }
  ];

  return (
    <CompanyWrapper
      headingData={headingData}
      topBannerHeading={"Add Company"}
      topBannerContent2={
        <Typography sx={Style.topBannerContent2}>
          Fill in the details below to register your company
        </Typography>
      }
    >
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      > */}
      {/* <Box sx={globalStyle.HeroBanner}> */}
      {/* <Box
            display={"flex"}
            component={"div"}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon sx={globalStyle.arrowback} />
          </Box> */}
      {/* <Typography sx={globalStyle.headings}>
            {id ? "Update Company" : "Add Company"}
          </Typography> */}
      {/* </Box> */}
      {/* {selectedFile ? (
          <>
            <img
              src={imgpath || data?.logo}
              alt="Selected File"
              style={{ width: "100px", height: "100px" }}
              onClick={() => fileInputRef.current.click()}
            />
            <Box
              component={"input"}
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </>
        ) : (
          <Button
            onClick={() => fileInputRef.current.click()}
            sx={Style.addLogoBtn}
          >
            <>
              <AddIcon
                style={{
                  width: "30px",
                  height: "30px",
                  m: 0,
                  cursor: "pointer",
                }}
              />
              Add Company logo here
              <Box
                component={"input"}
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </>
          </Button>
        )} */}
      {/* </Box> */}
      {/* <Divider sx={globalStyle.divider} /> */}
      <Box sx={globalStyle.wrapper}>
        <AddCompanyForm
          imgPath={selectedFile}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </Box>
    </CompanyWrapper>
    // </Layout>
  );
};

export default AddCompany;
