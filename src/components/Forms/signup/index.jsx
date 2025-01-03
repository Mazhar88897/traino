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
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { formikValidation, handleError } from "../../../hooks/globalFunction";
import useWindowDimensions from "../../../hooks/windowDimensions";
import { signUp } from "../../../services/auth";
import { IMAGES } from "../../../theme";
import CustomButton from "../../CustomButton";
import ValidationError from "../../ValidationError";
import { Style } from "../style";
import { useDispatch } from "react-redux";
const SignUpForm = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Required!"),
      lastName: Yup.string().required("Required!"),
      email: Yup.string().email().required("Required!"),
      password: Yup.string().required("Required!"),
      confirmPassword: Yup.string()
        .required("Required!")
        .oneOf([Yup.ref("password"), null], "Passwords should be matched"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const { firstName, lastName, email, password, confirmPassword } = values;
      const data = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role: "Admin",
        re_password: confirmPassword,
      };
      await signUp(dispatch, navigate, data)
        .then((res) => {
          toast.success(
            "Verification link has been sent to your provided email!"
          );
          resetForm();
          setLoading(false);
        })
        .catch((err) => {
          toast.error(handleError(data, err?.response?.data));
          setLoading(false);
        });
    },
  });
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
        <Typography sx={Style.heading}>Sign Up</Typography>
        <FormControl sx={Style.formControl} variant="outlined">
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <OutlinedInput
            id="firstName"
            type={"text"}
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik?.errors?.firstName && formik.touched.firstName && (
            <ValidationError error={formik?.errors?.firstName} />
          )}
        </FormControl>
        <FormControl sx={Style.formControl} variant="outlined">
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <OutlinedInput
            id="lastName"
            type={"text"}
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik?.errors?.lastName && formik.touched.lastName && (
            <ValidationError error={formik?.errors?.lastName} />
          )}
        </FormControl>
        <FormControl sx={Style.formControl} variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            type={"text"}
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik?.errors?.email && formik.touched.email && (
            <ValidationError error={formik?.errors?.email} />
          )}
        </FormControl>
        <FormControl sx={Style.formControl} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
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
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik?.errors?.password && formik.touched.password && (
            <ValidationError error={formik?.errors?.password} />
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
          sx={Style.halfButton}
          buttonText={"SIGN UP"}
          type={"submit"}
          loading={loading}
          disable={formikValidation(formik)}
        />
        <Typography sx={Style.redirectText}>
          Already have an account?{" "}
          <Box
            onClick={() => navigate("/signin")}
            component="span"
            sx={Style.redirect}
          >
            Sign In
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};
export default SignUpForm;
