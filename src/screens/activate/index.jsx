import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton, Loader } from "../../components";
import { activation } from "../../services/auth";
import { globalStyle } from "../../styles/globalStyle";
import { Style } from "./style";
import { useDispatch } from "react-redux";

const Activate = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    icon: <CheckCircleOutlineIcon sx={Style.succesIcon} />,
    tittle: "Account Verifed",
    content:
      "We're thrilled to inform you that your email address has been successfully verified! This step ensures that you have full access to all our features and updates. Welcome to our community, and thank you for confirming your email!",
  });

  const handleActivate = async () => {
    if (uid && token) {
      try {
        await activation(dispatch, navigate, { uid, token });
        setLoading(false);
      } catch (err) {
        setContent({
          icon: <ErrorOutlineIcon sx={Style.errorIcon} />,
          tittle: "Error",
          content:
            err?.response?.data.detail ||
            err?.response?.data.uid[0] ||
            err?.response?.data.token[0],
        });
        setLoading(false);
      }
    } else {
      navigate("/signin");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleActivate();
  }, []);

  if (loading) {
    return (
      <Box sx={Style.loaderContainer}>
        <Loader />
      </Box>
    );
  }

  return (
    <Box sx={globalStyle.main}>
      <Box sx={Style.main}>
        {content.icon}
        <Typography sx={Style.heading}>{content.tittle}</Typography>
        <Typography sx={Style.message}>{content.content}</Typography>
        <CustomButton
          buttonText={"SIGN IN"}
          onClick={() => navigate("/signin")}
        />
      </Box>
    </Box>
  );
};

export default Activate;
