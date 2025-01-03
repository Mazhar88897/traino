import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { formikValidation, handleError } from "../../../hooks/globalFunction";
import useWindowDimensions from "../../../hooks/windowDimensions";
import { newPaasword } from "../../../services/auth";
import { IMAGES } from "../../../theme";
import CustomButton from "../../CustomButton";
import ValidationError from "../../ValidationError";
import { Style } from "../style";
import { useDispatch } from "react-redux";

const ResetPasswordForm = () => {
  const { width } = useWindowDimensions();
  const { uid, token } = useParams();
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string().required("Required!"),
      confirmPassword: Yup.string()
        .required("Required!")
        .oneOf([Yup.ref("newPassword"), null], "Passwords should be matched"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const { newPassword, confirmPassword } = values;
      const data = {
        uid,
        token,
        new_password: newPassword,
        re_new_password: confirmPassword,
      };
      await newPaasword(dispatch, navigate, data)
        .then((res) => {
          setLoading(false);
          navigate("/signin");
          toast.success("Password successfully changed");
          resetForm();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(handleError(data, err?.response?.data));
        });
    },
  });
  useEffect(() => {
    if (!uid || !token) {
      navigate("/signin");
    }
  }, []);
  return (
    <Box sx={[Style.formSection, Style.columnContainer]}>
      {width < 500 && (
        <Box sx={Style.logoContainer}>
          <Box component={"img"} src={IMAGES.logo} sx={Style.logo} />
        </Box>
      )}
      <Box
        component="form"
        sx={Style.form}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Typography sx={Style.heading}>Reset Password</Typography>
        <FormControl sx={Style.formControl} variant="outlined">
          <InputLabel htmlFor="password">New Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword.password ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setShowPassword((prevState) => ({
                      ...prevState,
                      password: !prevState.password,
                    }))
                  }
                  edge="end"
                >
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik?.errors?.newPassword && formik.touched.newPassword && (
            <ValidationError error={formik?.errors?.newPassword} />
          )}
        </FormControl>
        <FormControl sx={Style.formControl} variant="outlined">
          <InputLabel htmlFor="password">Confirm Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword.confirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setShowPassword((prevState) => ({
                      ...prevState,
                      confirmPassword: !prevState.confirmPassword,
                    }))
                  }
                  edge="end"
                >
                  {showPassword.confirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik?.errors?.confirmPassword &&
            formik.touched.confirmPassword && (
              <ValidationError error={formik?.errors?.confirmPassword} />
            )}
        </FormControl>
        <CustomButton
          sx={{ width: "50%" }}
          buttonText={"CONFIRM"}
          type={"submit"}
          loading={loading}
          disable={formikValidation(formik)}
        />
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
